import {getMetaQuery, Meta, PAGE_FRAGMENT, PageComponent} from "../selectors/queries/_getMetaData";
import {LOW_PERFORMING_DEFAULT_QUERY} from "../selectors/queries/_getDefaultData";

import {Context} from "../pages/[[...contentPath]]";

import typeSelector, {SelectedQueryMaybeVariablesFunc, ContentSelector, VariablesGetter} from "../selectors/contentSelector";
import enonicConnectionConfig, {
    APP_NAME, APP_NAME_DASHED,
    fromXpRequestType,
    getRenderMode,
    getSingleCompRequest,
    XP_RENDER_MODE
} from "../enonic-connection-config";


export type EnonicConnectionConfigRequiredFields = {
    CONTENT_API_URL: string,
    getXpPath: (siteRelativeContentPath: string) => string,
    fromXpRequestType: (context?: Context) => string | boolean
};


export type ResultMeta = Meta & {
    path: string,
    xpRequestType?: string | boolean,
    requestedComponent?: string
    renderMode: XP_RENDER_MODE,
}

type Result = {
    error?: {
        code: string,
        message: string
    }
}

type MetaResult = Result & {
    meta?: Meta
};

export type PageData = {
    regions?: RegionTree
}

export type FetchContentResult = Result & {
    content: any,
    meta: ResultMeta,
    page?: PageData,
    components?: any,
};


type FetcherConfig<T extends EnonicConnectionConfigRequiredFields> = {
    enonicConnectionConfig: T,
    typeSelector?: ContentSelector,
    firstMethodKey?: boolean,
}

/**
 * Sends one query to the guillotine API and asks for content type, then uses the type to select a second query and variables, which is sent to the API and fetches content data.
 * @param contentPath string or string array: pre-split or slash-delimited _path to a content available on the API
 * @returns FetchContentResult object: {data?: T, error?: {code, message}}
 */
export type ContentFetcher = (
    contentPath: string | string[],
    context: Context
) => Promise<FetchContentResult>


///////////////////////////////////////////////////////////////////////////////// Data

// Shape of content base-data API body
type ContentApiBaseBody = {
    query?: string,                 // Override the default base-data query
    variables?: {                   // GraphQL variables inserted into the query
        path?: string,              // Full content item _path
    }
};

/** Generic fetch */
export const fetchFromApi = async (
    apiUrl: string,
    body: {},
    method = "POST"
) => {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    };

    let res;
    try {
        res = await fetch(apiUrl, options);
    } catch (e) {
        console.warn(apiUrl, e);
        throw new Error(JSON.stringify({
            code: "API",
            message: e.message
        }));
    }

    if (!res.ok) {
        throw new Error(JSON.stringify({
            code: res.status,
            message: `Data fetching failed (message: '${await res.text()}')`
        }));
    }

    let json;
    try {
        json = await res.json();
    } catch (e) {
        throw new Error(JSON.stringify({
            code: 500,
            message: `API call completed but with non-JSON data: ${JSON.stringify(await res.text())}`
        }));
    }

    if (!json) {
        throw new Error(JSON.stringify({
            code: 500,
            message: `API call completed but with unexpectedly empty data: ${JSON.stringify(await res.text())}`
        }));
    }

    return json;
};

type GuillotineResponse = {
    // @ts-ignore
    error?: {
        code: number,
        message: string
    },
    [dataKey: string]: {}
}

/** Guillotine-specialized fetch, using the generic fetch above */
const fetchGuillotine = async (
    contentApiUrl: string,
    body: ContentApiBaseBody,
    key: 'content' | 'meta',
    xpContentPath: string,
    requiredMethodKeyFromQuery?: string
): Promise<GuillotineResponse> => {
    if (typeof body.query !== 'string' || !body.query.trim()) {
        // @ts-ignore
        return await {
            error: {
                code: 400,
                message: `Invalid or missing query. JSON.stringify(query) = ${JSON.stringify(body.query)}`
            }
        };
    }

    const result = await fetchFromApi(
        contentApiUrl,
        body
    )
        .then(json => {
            let errors: any[] = (json || {}).errors;

            if (errors) {
                if (!Array.isArray(errors)) {
                    errors = [errors];
                }
                console.warn(`${errors.length} error(s) when trying to fetch data (path = ${JSON.stringify(xpContentPath)}):`);
                errors.forEach(error => {
                    console.error(error);
                });
                console.warn(`Query:\n${body.query}`);
                console.warn(`Variables: ${JSON.stringify(body.variables, null, 2)}`);

                // @ts-ignore
                return {
                    error: {
                        code: 500,
                        message: `Server responded with ${errors.length} error(s), probably from guillotine - see log.`
                    }
                };
            }

            // @ts-ignore
            const guillotineData = ((json || {}).data || {}).guillotine || {};
            if (Object.keys(guillotineData).length === 0) {
                console.warn(`Empty/unexpected data from guillotine API (path = ${JSON.stringify(xpContentPath)}).\nResponse:\n`, json);
                return {error: {code: 404, message: "Content not found"}};
            }
            if (requiredMethodKeyFromQuery && !guillotineData[requiredMethodKeyFromQuery]) {
                console.warn(`Empty/unexpected data from guillotine API (path = ${JSON.stringify(xpContentPath)}).\nResponse:\n`, json);
                return {error: {code: 404, message: "Content not found"}};
            }

            const data = requiredMethodKeyFromQuery
                ? json.data.guillotine[requiredMethodKeyFromQuery]
                : json.data.guillotine;

            return {
                [key]: data
            };

        })
        .catch((err) => {
            console.warn(`Client-side error when trying to fetch data (path = ${JSON.stringify(xpContentPath)})`, err);
            try {
                return {error: JSON.parse(err.message)};
            } catch (e2) {
                return {error: {code: "Client-side error", message: err.message}}
            }
        });

    return result as GuillotineResponse;
};


///////////////////////////////////////////////////////////////////////////////// Guillotine result unpacking

const PATTERN = /\{\s*guillotine\s*\{\s*(.+?)\s*[{(]/;

const getQueryKey = (query: string): string => {
    try {
        // @ts-ignore
        const mainQueryKey = query.match(PATTERN)[1];
        if (!mainQueryKey) {
            throw Error("Regex match group 1 is empty.")
        }
        return mainQueryKey;
    } catch (e) {
        console.warn(e);
        throw Error("Couldn't extract main query key from query string:" + query);
    }
}

const queryMethodKeyCache: { [key: string]: string } = {};

const getQueryMethodKey = (contentType: string, query: string) => {
    let methodKeyFromQuery: string = queryMethodKeyCache[contentType];
    if (!methodKeyFromQuery) {
        methodKeyFromQuery = getQueryKey(query);
        if (methodKeyFromQuery) {
            queryMethodKeyCache[contentType] = methodKeyFromQuery;
        }
    }
    return methodKeyFromQuery;
}


///////////////////////////////////////////////////////////////////////////////// No-op

const NO_PROPS_PROCESSOR = (props: any) => props;


///////////////////////////////////////////////////////////////////////////////// Specific fetch wrappers:

const fetchMetaData = async (contentApiUrl: string, xpContentPath: string, xpRequestType: string | boolean, isEditMode: boolean): Promise<MetaResult> => {
    const body: ContentApiBaseBody = {
        query: getMetaQuery(isEditMode, /* xpRequestType == "view" ? */ PAGE_FRAGMENT /* : undefined */),
        variables: {
            path: xpContentPath
        }
    };
    return await fetchGuillotine(contentApiUrl, body, 'meta', xpContentPath, 'get') as MetaResult;
}


const fetchContentData = async <T>(
    contentApiUrl: string,
    xpContentPath: string,
    query: string,
    methodKeyFromQuery?: string,
    variables?: {}
): Promise<FetchContentResult> => {

    const body: ContentApiBaseBody = {query};
    if (variables && Object.keys(variables).length > 0) {
        body.variables = variables;
    }
    return await fetchGuillotine(contentApiUrl, body, 'content', xpContentPath, methodKeyFromQuery) as FetchContentResult;
};


///////////////////////////////////////////////////////////////////////////////// Error checking:

/** Checks a site-relative contentPath as a slash-delimited string or a string array, and returns a pure site-relative path string (no double slashes, starts with a slash, does not end with one). */
const getCleanContentPathArrayOrThrow400 = (contentPath: string | string[] | undefined): string => {
    if (contentPath === undefined) {
        return ''
    }
    const isArray = Array.isArray(contentPath);

    if (!isArray) {
        if (typeof contentPath !== 'string') {
            throw Error(JSON.stringify({
                code: 400,
                message: `Unexpected target content _path: contentPath must be a string or pure string array (contentPath=${JSON.stringify(
                    contentPath)})`
            }));
        }

        return contentPath;

    } else {
        return (contentPath as string[]).join('/');
    }
}


//------------------------------------------------------------- XP view component data handling


interface PageRegion {
    name: string;
    components: PageComponent[];
}

export type RegionTree = { [key: string]: PageRegion }

function getInfo(cmp: PageComponent): { region: string, index: number } | undefined {
    const match = cmp.path.match(/\/(\w+)\/(\d+)/);
    if (match) {
        return {
            region: match[1],
            index: +match[2],
        }
    }
    return;
}

type PageAsJson = {
    regions?: Record<string, any>
}

function buildRegionTree(comps: PageComponent[], pageAsJson?: PageAsJson, isEditMode?: boolean): RegionTree {
    const regions: RegionTree = {};

    if (isEditMode) {
        Object.keys(pageAsJson?.regions || []).forEach(regionName => {
            regions[regionName] = {
                name: regionName,
                components: []
            };
        })
    }

    (comps || []).forEach(cmp => {
        const info = getInfo(cmp);
        if (info) {
            let region = regions[info.region];
            if (!region) {
                region = {
                    name: info.region,
                    components: [],
                };
                regions[info.region] = region;
            }

            if (cmp.type === 'part' && cmp.part && cmp.part.configAsJson) {
                const [appName, partName] = (cmp.part.descriptor || "").split(':');
                if (appName === APP_NAME && cmp.part.configAsJson[APP_NAME_DASHED][partName]) {
                    cmp.part.__config__ = cmp.part!.configAsJson[APP_NAME_DASHED][partName]
                }
            }

            region.components.push(cmp);
        } else {
            // this is view component
            // TODO: something here later, if we're making a pageSelector too
        }
    });

    //console.log("Regions: " + JSON.stringify(regions, null, 2));

    return regions;
}


///////////////////////////////////////////////////////////////////////////////// ENTRY 1 - THE BUILDER:


/**
 * Configures, builds and returns a general fetchContent function.
 * @param enonicConnectionConfig Object containing attributes imported from enonic-connecion-config.js: the methods getXpPath and fromXpRequestType, and the string CONTENT_API_URL. Easiest: caller imports enonic-connection-config and just passes that entire object here as enonicConnectionConfig.
 * @param typeSelector Object, usually the typeSelector from typeSelector.ts, where keys are full XP content type strings (eg. 'my.app:content-type') and values are optional type-specific objects of config for how to handle that function. All attributes in these objecs are optional (see typeSelector.ts for examples):
 *          - 'query' can be a guillotine query string to use to fetch data for that content type, OR also have a get-guillotine-variables function - by an object with 'query' and 'variables' attributes, or an array where the query string is first and the get-variables function is second.
 *          - 'props' is a function for processing props: converting directly-from-guillotine props to props adapted for displaying the selected view component
 * @param firstMethodKey boolean to switch on or off functionality that detects the first method in the query (and if used, the assumption is: there is only one method in ALL existing queries), and unpacks the data from below that key.
 *          - firstMethodKey=true: can simplify usage a bit, but ONLY use if all query strings use only one guillotine method call - no queries have more than one (eg. 'get' in the query string 'query($path:ID!){ guillotine { get(key:$path) { type }}}'). The (first) guillotine method call is autodetected from each query string ('get', 'getChildren', 'query' etc), and that string is used in two ways. The response under that key is checked for non-null content (returns 404 error if null), and the returned content is the object below that method-named key (which in turn is under the 'guillotine' key in the response from the guillotine API (in this example: the value of reponseData.guillotine['get']).
 *          - firstMethodKey=false: this disables the autodetection, a 404 error is only returned if no (or empty) object under the 'guillotine' key was found. Otherwise, the entire data object under 'guillotine' is returned, with all method-named keys from the query - not just the data under the method-named key from the query.
 * @return fetchContent {function} Runs custom content-type-specific guillotine calls against an XP guillotine endpoint
 */
export const buildContentFetcher = <T extends EnonicConnectionConfigRequiredFields>(
    {
        enonicConnectionConfig,
        typeSelector,
        firstMethodKey
    }: FetcherConfig<T>
): ContentFetcher => {

    const {CONTENT_API_URL, getXpPath, fromXpRequestType} = enonicConnectionConfig;

    const defaultGetVariables: VariablesGetter = (path) => ({path});


    ////////////////////////////////  Inner utility function
    const getQueryAndVariables = (type: string, path: string, context?: Context, selectedQuery?: SelectedQueryMaybeVariablesFunc) => {

        // @ts-ignore
        let query, getVariables = null;
        if (!selectedQuery) {
            query = LOW_PERFORMING_DEFAULT_QUERY;

        } else if (typeof selectedQuery === 'string') {
            query = selectedQuery;

        } else if (Array.isArray(selectedQuery)) {
            query = selectedQuery[0];
            getVariables = selectedQuery[1];

        } else if (typeof selectedQuery === 'object') {
            query = selectedQuery.query;
            getVariables = selectedQuery.variables;
        }

        if (typeof query !== 'string') {
            throw Error(`Selected query for content type ${type} should be a query string, not: ${typeof query}`);
        }
        if (!getVariables) {
            getVariables = defaultGetVariables;
        } else if (typeof getVariables !== 'function') {
            throw Error(`Selected query for content type ${type} should be a getVariables function, not: ${typeof getVariables}`);
        }

        // Default query and variables if no content-type-specific query was found for the type
        if (!query) {
            console.warn(`${JSON.stringify(path)}: no query has been assigned for the content type ${JSON.stringify(
                type)}.\n\nThe default data query (_getDefaultData.ts) will be used, but note that this is a development tool and won't scale well in production. It's HIGHLY RECOMMENDED to write a content-type-specialized guillotine query, and add that to querySelector in querySelector.ts!`);
            query = LOW_PERFORMING_DEFAULT_QUERY;
            getVariables = defaultGetVariables;
        }

        return {
            query,
            variables: getVariables(path, context)
        }
    };


    /////////////////////////////////////////////////////// START BUILDING THE FETCHER FUNCTION, AND RETURN IT:

    /**
     * Runs custom content-type-specific guillotine calls against an XP guillotine endpoint, returns content data, error and some meta data
     * Sends one query to the guillotine API and asks for content type, then uses the type to select a second query and variables, which is sent to the API and fetches content data.
     * @param contentPath string or string array: local (site-relative) path to a content available on the API (by XP _path - obtainable by running contentPath through getXpPath). Pre-split into string array, or already a slash-delimited string.
     * @param context Context object from Next, contains .query info
     * @returns FetchContentResult object: {data?: T, error?: {code, message}}
     */
    const fetchContent: ContentFetcher = async (
        contentPath: string | string[],
        context?: Context
    ): Promise<FetchContentResult> => {

        try {
            const siteRelativeContentPath = getCleanContentPathArrayOrThrow400(contentPath);
            const xpContentPath = getXpPath(siteRelativeContentPath);

            const xpRequestType = fromXpRequestType(context);
            const renderMode = getRenderMode(context);
            const isEditMode = renderMode === XP_RENDER_MODE.EDIT

            console.info(`fetchContent: fromXp = ${xpRequestType}; renderMode = ${renderMode}`);

            ////////////////////////////////////////////// FIRST GUILLOTINE CALL FOR METADATA - MAINLY XP CONTENT TYPE:
            const metaResult = await fetchMetaData(CONTENT_API_URL, xpContentPath, xpRequestType, isEditMode);
            //////////////////////////////////////////////


            if (metaResult.error) {
                // @ts-ignore
                return await {
                    error: metaResult.error
                };
            }

            const {type, components, pageAsJson} = metaResult.meta || {};

            if (!type) {
                // @ts-ignore
                return await {
                    error: {
                        code: 500,
                        message: "Server responded with incomplete meta data: missing content 'type' attribute."
                    }
                }
            }


            ////////////////////////////////////////////////////  Content type established. Proceed to data call:

            const typeSelection = (typeSelector || {})[type];

            const {query, variables} = getQueryAndVariables(type, xpContentPath, context, typeSelection?.query);
            if (!query.trim()) {
                // @ts-ignore
                return await {
                    error: {
                        code: 400,
                        message: `Missing or empty query override for content type ${JSON.stringify(type)}`
                    }
                }
            }

            const methodKeyFromQuery = firstMethodKey
                ? getQueryMethodKey(type, query)
                : undefined;


            ////////////////////////////////////////////// SECOND GUILLOTINE CALL FOR DATA:
            const guillotineResponse = await fetchContentData(CONTENT_API_URL, xpContentPath, query, methodKeyFromQuery, variables);
            //////////////////////////////////////////////////////////////////////////////


            if (guillotineResponse.content) {
                const propsProcessor = typeSelection?.props || NO_PROPS_PROCESSOR;
                guillotineResponse.content = propsProcessor(guillotineResponse.content, context);
            }

            const response = await {
                ...guillotineResponse,
                meta: {
                    path: siteRelativeContentPath,
                    type
                }
            } as FetchContentResult;

            // .meta will be visible in final rendered inline props. Only adding some .meta attributes here on certain conditions (instead if always adding them and letting them be visible as false/undefined etc)
            if (xpRequestType) {
                response.meta!.xpRequestType = xpRequestType
                if (xpRequestType === 'component') {
                    response.meta!.requestedComponent = getSingleCompRequest(context);
                }
            }
            if (components || (pageAsJson && isEditMode)) {
                response.page = {
                    ...response.page || {},
                    regions: buildRegionTree(components!, pageAsJson, isEditMode)
                }
            }
            response.meta!.renderMode = renderMode;

            return response;


            /////////////////////////////////////////////////////////////  Catch

        } catch (e) {
            console.error(e);

            let error;
            try {
                error = JSON.parse(e.message);
            } catch (e2) {
                error = {
                    code: "Local",
                    message: e.message
                }
            }
            // @ts-ignore
            return await {error};
        }
    };

    return fetchContent;
};


//////////////////////////////////////////////////////////////  ENTRY 2: ready-to-use fetchContent function

// Config and prepare a default fetchContent function, with params from imports:
export const fetchContent: ContentFetcher = buildContentFetcher<EnonicConnectionConfigRequiredFields>({
    enonicConnectionConfig,
    typeSelector,
    firstMethodKey: true
});
