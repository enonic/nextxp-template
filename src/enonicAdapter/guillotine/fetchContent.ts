import {getMetaQuery, MetaData, PAGE_FRAGMENT, PageComponent, PageData, PageRegion, RegionTree} from "./_getMetaData";

import {Context} from "../../pages/[[...contentPath]]";

import enonicConnectionConfig, {
    FRAGMENT_CONTENTTYPE_NAME,
    FRAGMENT_DEFAULT_REGION_NAME,
    PAGE_TEMPLATE_CONTENTTYPE_NAME,
    XP_COMPONENT_TYPE,
    XP_RENDER_MODE,
    XP_REQUEST_TYPE,
} from "../enonic-connection-config";
import {SelectedQueryMaybeVariablesFunc, TypeDefinition, TypesRegistry} from '../TypesRegistry';
import {defaultVariables, LOW_PERFORMING_DEFAULT_QUERY} from './_getDefaultData';

export type EnonicConnectionConfig = {
    APP_NAME: string,
    APP_NAME_DASHED: string,
    CONTENT_API_URL: string,
    getXpPath: (siteRelativeContentPath: string) => string,
    getXPRequestType: (context?: Context) => XP_REQUEST_TYPE,
    getRenderMode: (context?: Context) => XP_RENDER_MODE,
    getSingleComponentPath: (context?: Context) => string | undefined
};

type Result = {
    error?: {
        code: string,
        message: string
    } | null;
}

type GuillotineResult = Result & {
    [dataKey: string]: any;
}

type MetaResult = Result & {
    meta?: {
        type: string,
        pageAsJson?: PageData,
        components?: PageComponent[],
    }
};

type ContentResult = Result & {
    contents?: Record<string, any>[];
};

interface ComponentDescriptor {
    type?: TypeDefinition;
    component?: PageComponent;
    queryAndVariables?: QueryAndVariables;
}

export type FetchContentResult = Result & {
    content: Record<string, any> | null,
    meta: MetaData | null,
    page: PageData | null,
};


type FetcherConfig<T extends EnonicConnectionConfig> = T & {
    typesRegistry: typeof TypesRegistry
};

interface QueryAndVariables {
    query: string;
    variables?: Record<string, any>;
}

/**
 * Sends one query to the guillotine API and asks for content type, then uses the type to select a second query and variables, which is sent to the API and fetches content data.
 * @param contentPath string or string array: pre-split or slash-delimited _path to a content available on the API
 * @returns FetchContentResult object: {data?: T, error?: {code, message}}
 */
export type ContentFetcher = (contentPath: string | string[], context: Context) => Promise<FetchContentResult>


const NO_PROPS_PROCESSOR = async (props: any) => props || {};

const ALIAS_PREFIX = 'request';

const GUILLOTINE_QUERY_REGEXP = /^\s*query\s*(?:\((.*)*\))?\s*{\s*guillotine\s*{((?:.|\s)+)}\s*}\s*$/;

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

/** Guillotine-specialized fetch, using the generic fetch above */
const fetchGuillotine = async (
    contentApiUrl: string,
    body: ContentApiBaseBody,
    xpContentPath: string,
): Promise<GuillotineResult> => {
    if (typeof body.query !== 'string' || !body.query.trim()) {
        return {
            error: {
                code: '400',
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

                return {
                    error: {
                        code: '500',
                        message: `Server responded with ${errors.length} error(s), probably from guillotine - see log.`
                    }
                };
            }

            return json.data;
        })
        .catch((err) => {
            console.warn(`Client-side error when trying to fetch data (path = ${JSON.stringify(xpContentPath)})`, err);
            try {
                return {error: JSON.parse(err.message)};
            } catch (e2) {
                return {error: {code: "Client-side error", message: err.message}}
            }
        });

    return result as GuillotineResult;
};

///////////////////////////////////////////////////////////////////////////////// Specific fetch wrappers:

const fetchMetaData = async (contentApiUrl: string, xpContentPath: string): Promise<MetaResult> => {
    const body: ContentApiBaseBody = {
        query: getMetaQuery(PAGE_FRAGMENT),
        variables: {
            path: xpContentPath
        }
    };
    const metaResult = await fetchGuillotine(contentApiUrl, body, xpContentPath);
    if (metaResult.error) {
        return metaResult;
    } else {
        return {
            meta: metaResult?.guillotine?.get,
        };
    }
}


const fetchContentData = async <T>(
    contentApiUrl: string,
    xpContentPath: string,
    query: string,
    variables?: {}
): Promise<ContentResult> => {

    const body: ContentApiBaseBody = {query};
    if (variables && Object.keys(variables).length > 0) {
        body.variables = variables;
    }
    const contentResults = await fetchGuillotine(contentApiUrl, body, xpContentPath);

    if (contentResults.error) {
        return contentResults;
    } else {
        return {
            // omit the aliases and return values
            contents: Object.values(contentResults).map(content => {
                // if there were just 1 query (meaning there is 1 key in response) then return its contents directly
                const contentValues = Object.values(content);
                return contentValues.length == 1 ? contentValues[0] : content;
            }),
        }
    }
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


type PathFragment = { region: string, index: number };

function parseComponentPath(contentType: string, path: string): PathFragment[] {
    const matches: PathFragment[] = [];
    let match;
    const myRegexp = /(?:(\w+)\/(\d+))+/g;
    while ((match = myRegexp.exec(path)) !== null) {
        matches.push({
            region: match[1],
            index: +match[2],
        })
    }
    if (contentType === FRAGMENT_CONTENTTYPE_NAME) {
        // there are no main region in fragment content
        // and the root component has '/' path
        // adding '' since we omit '/'
        matches.unshift({
            region: '',
            index: -1
        });
    }
    return matches;
}

function getParentRegion(source: RegionTree, contentType: string, cmpPath: string, components: PageComponent[] = [],
                         createMissing?: boolean): PageRegion | undefined {

    const path = parseComponentPath(contentType, cmpPath);

    let currentTree: RegionTree = source;
    let currentRegion: PageRegion | undefined;
    let parentPath = '';

    for (let i = 0; i < path.length; i++) {
        const pathFragment = path[i];
        const regionName = pathFragment.region;
        // with fragments, there may be no index because there is no main region
        parentPath += pathFragment.index >= 0 ? `/${pathFragment.region}/${pathFragment.index}` : '/';
        currentRegion = currentTree[regionName];

        if (!currentRegion) {
            if (createMissing) {
                currentRegion = {
                    name: regionName,
                    components: [],
                };
                currentTree[regionName] = currentRegion;
            } else {
                throw `Region [${regionName}] was not found`;
            }
        }

        if (i < path.length - 1) {
            // look for layouts inside if this is not the last path fragment

            const layout = components.find((cmp: PageComponent) => cmp.type === XP_COMPONENT_TYPE.LAYOUT && cmp.path === parentPath);
            if (!layout) {
                throw `Layout [${parentPath}] not found among components, but needed for component [${cmpPath}]`
            }
            if (!layout.regions) {
                layout.regions = {};
            }
            currentTree = layout.regions;
        }
    }

    return currentRegion;
}

function buildRegionTree(contentType: string, comps: PageComponent[] = []): RegionTree {

    const tree: RegionTree = {};
    comps.forEach(cmp => {
        let region;
        if (cmp.path === '/' && contentType === FRAGMENT_CONTENTTYPE_NAME) {
            // this is a fragment
            // it does not have a region, but we need one in order to pass it as a page
            // so create a FRAGMENT_DEFAULT_REGION_NAME region that fragment view will handle appropriately
            region = tree[FRAGMENT_DEFAULT_REGION_NAME];
            if (!region) {
                region = {
                    name: FRAGMENT_DEFAULT_REGION_NAME,
                    components: []
                }
                tree[FRAGMENT_DEFAULT_REGION_NAME] = region;
            }
        } else {
            region = getParentRegion(tree, contentType, cmp.path, comps, true);
        }

        if (region) {
            // getting the index of component from string like '/main/0/left/1'
            const cmpIndex = +cmp.path.substr(cmp.path.length - 1);
            region.components.splice(cmpIndex, 0, cmp);
        }
    });

    // console.info("Regions with components: " + JSON.stringify(tree, null, 2));

    return tree;
}


function combineMultipleQueries(queriesWithVars: ComponentDescriptor[]): QueryAndVariables {
    const queries: string[] = [];
    const superVars: { [key: string]: any } = {};
    const superParams: string[] = [];

    queriesWithVars.forEach((componentDescriptor: ComponentDescriptor, index: number) => {
        const queryAndVars = componentDescriptor.queryAndVariables;
        if (!queryAndVars) {
            return;
        }

        // Extract graphql query and its params and add prefixes to exclude collisions with other queries
        const match = queryAndVars.query.match(GUILLOTINE_QUERY_REGEXP);
        let query = '';
        if (match && match.length === 2) {
            // no params, just query
            query = match[1];
        } else if (match && match.length === 3) {
            // both query and params are present
            query = match[2];
            // process args
            const args = match[1];
            if (args) {
                args.split(',').forEach(originalParamString => {
                    const [originalKey, originalVal] = originalParamString.trim().split(':');
                    const [prefixedKey, prefixedVal] = [`$${ALIAS_PREFIX}${index}_${originalKey.substr(1)}`, originalVal];
                    superParams.push(`${prefixedKey}:${prefixedVal}`);
                    // also update param references in query itself !
                    query = query.replaceAll(originalKey, prefixedKey);
                });
            }
        }
        if (query.length) {
            queries.push(`${ALIAS_PREFIX}${index}:guillotine {${query}}`);
        }

        // Update variables with the same prefixes
        Object.entries(queryAndVars.variables || {}).forEach(entry => {
            superVars[`${ALIAS_PREFIX}${index}_${entry[0]}`] = entry[1];
        });
    });

    // Compose the super query
    const superQuery = `query ${superParams.length ? `(${superParams.join(', ')})` : ''} {
        ${queries.join('\n')}
    }`;

    return {
        query: superQuery,
        variables: superVars,
    }
}

async function applyProcessors(componentDescriptors: ComponentDescriptor[], contentResults: ContentResult,
                               context?: Context): Promise<any[]> {

    let dataCounter = 0;
    const processorPromises = componentDescriptors.map(async (desc: ComponentDescriptor) => {
        // we're iterating component descriptors here
        // some of them might not have provided graphql requests
        // but we still need to run props processor for them
        // in case they want to fetch their data from elsewhere
        const propsProcessor = desc.type?.props || NO_PROPS_PROCESSOR;
        let data;
        if (desc.queryAndVariables) {
            // if there is a query then there must be a result for it
            // they are not
            data = contentResults.contents![dataCounter++];
        }

        return await propsProcessor(data, context);
    });

    const settleResult = await Promise.allSettled(processorPromises);

    return settleResult.map(res => res.status === 'fulfilled' ? res.value : res);
}

function collectPartDescriptors(components: PageComponent[],
                                typesRegistry: typeof TypesRegistry,
                                requestedComponentPath: string | undefined,
                                xpContentPath: string,
                                context: Context | undefined
): ComponentDescriptor[] {

    const partDescriptors: ComponentDescriptor[] = [];

    for (const cmp of (components || [])) {
        // only look for parts
        // look for single part if it is a single component request
        if (XP_COMPONENT_TYPE.PART == cmp.type && (!requestedComponentPath || requestedComponentPath === cmp.path)) {
            const partDesc = cmp.part?.descriptor;
            if (partDesc) {
                const partTypeDef = typesRegistry.getPart(partDesc);
                if (partTypeDef) {
                    const partPath = `${xpContentPath}/_component${cmp.path}`;
                    const partQueryAndVars = getQueryAndVariables(cmp.type, partPath, partTypeDef.query, context);
                    partDescriptors.push({
                        component: cmp,
                        type: partTypeDef,
                        queryAndVariables: partQueryAndVars,
                    });
                }
            }
        } else if (XP_COMPONENT_TYPE.FRAGMENT === cmp.type) {
            // look for parts inside fragments
            const fragPartDescs = collectPartDescriptors(cmp.fragment!.fragment.components, typesRegistry, requestedComponentPath,
                xpContentPath, context);
            if (fragPartDescs.length) {
                partDescriptors.push(...fragPartDescs);
            }
        }
    }

    return partDescriptors;
}

function processPartConfigs(appNameDashed: string, partDescriptors: ComponentDescriptor[]) {
    partDescriptors.forEach(partDescriptor => {
        const cmp = partDescriptor.component;
        if (cmp?.part?.configAsJson) {
            const [appName, partName] = (cmp.part.descriptor || "").split(':');
            if (appName === appName && cmp.part.configAsJson[appNameDashed][partName]) {
                cmp.part.__config__ = cmp.part!.configAsJson[appNameDashed][partName];
            }
        }
    })
}

function getQueryAndVariables(type: string,
                              path: string,
                              selectedQuery?: SelectedQueryMaybeVariablesFunc,
                              context?: Context): QueryAndVariables | undefined {

    let query, getVariables;

    if (typeof selectedQuery === 'string') {
        query = selectedQuery;

    } else if (Array.isArray(selectedQuery)) {
        query = selectedQuery[0];
        getVariables = selectedQuery[1];

    } else if (typeof selectedQuery === 'object') {
        query = selectedQuery.query;
        getVariables = selectedQuery.variables;
    }

    if (getVariables && typeof getVariables !== 'function') {
        throw Error(`getVariables for content type ${type} should be a function, not: ${typeof getVariables}`);
    }

    if (query && typeof query !== 'string') {
        throw Error(`Query for content type ${type} should be a string, not: ${typeof query}`);
    }

    if (query) {
        return {
            query,
            variables: getVariables ? getVariables(path, context) : undefined,
        }
    }
}


function createPageData(contentType: string, components?: PageComponent[]): PageData | undefined {
    let page;
    if (components) {
        page = {
            regions: buildRegionTree(contentType, components)
        }
    }

    return page as PageData;
}


function createMetaData(contentType: string, contentPath: string, requestType: XP_REQUEST_TYPE, renderMode: XP_RENDER_MODE,
                        requestedComponentPath: string | undefined,
                        pageData?: PageData, components: PageComponent[] = []): MetaData {
    // .meta will be visible in final rendered inline props.
    // Only adding some .meta attributes here on certain conditions
    // (instead of always adding them and letting them be visible as false/undefined etc)
    const meta: MetaData = {
        type: contentType,
        path: contentPath,
        requestType: requestType,
        renderMode: renderMode
    }

    const regions = pageData?.regions;

    if (requestedComponentPath) {
        meta.requestedComponent = components.find(cmp => cmp.path === requestedComponentPath);
    }

    const hasController = regions && Object.keys(regions).length > 0;
    meta.canRender = hasController || !!TypesRegistry.getContentType(contentType)?.view

    return meta;
}

function errorResponse(code: string = '500', message: string = 'Unknown error'): FetchContentResult {
    return {
        error: {
            code,
            message,
        },
        page: null,
        content: null,
        meta: null,
    };
}

///////////////////////////////  ENTRY 1 - THE BUILDER:

/**
 * Configures, builds and returns a general fetchContent function.
 * @param enonicConnectionConfig Object containing attributes imported from enonic-connecion-config.js: constants and function concerned with connection to the XP backend. Easiest: caller imports enonic-connection-config and just passes that entire object here as enonicConnectionConfig.
 * @param typesRegistry TypesRegistry object from TypesRegistry.ts, holding user type mappings that are set in typesRegistration.ts file
 * @returns ContentFetcher
 */
export const buildContentFetcher = <T extends EnonicConnectionConfig>(config: FetcherConfig<T>): ContentFetcher => {

    const {
        APP_NAME,
        APP_NAME_DASHED,
        CONTENT_API_URL,
        getXpPath,
        getXPRequestType,
        getRenderMode,
        getSingleComponentPath,
        typesRegistry,
    } = config;

    return async (
        contentPathOrArray: string | string[],
        context?: Context
    ): Promise<FetchContentResult> => {

        try {
            const siteRelativeContentPath = getCleanContentPathArrayOrThrow400(contentPathOrArray);
            const contentPath = getXpPath(siteRelativeContentPath);

            const requestType = getXPRequestType(context);
            const renderMode = getRenderMode(context);
            let requestedComponentPath: string | undefined;
            if (requestType === XP_REQUEST_TYPE.COMPONENT) {
                requestedComponentPath = getSingleComponentPath(context);
            }

            ///////////////  FIRST GUILLOTINE CALL FOR METADATA     /////////////////
            const metaResult = await fetchMetaData(CONTENT_API_URL, contentPath);
            /////////////////////////////////////////////////////////////////////////

            if (metaResult.error) {
                return errorResponse(metaResult.error.code, metaResult.error.message);
            }

            const {type, components} = metaResult.meta || {};

            if (!type) {
                return errorResponse('500', "Server responded with incomplete meta data: missing content 'type' attribute.")

            } else if (renderMode === XP_RENDER_MODE.LIVE && (type === FRAGMENT_CONTENTTYPE_NAME || PAGE_TEMPLATE_CONTENTTYPE_NAME)) {
                return errorResponse('404', `Content type [${type}] is not accessible in ${renderMode} mode`);
            }


            ////////////////////////////////////////////////////  Content type established. Proceed to data call:

            const componentDescriptors: ComponentDescriptor[] = [];

            // Add the content type query at all cases
            const contentTypeDef = typesRegistry?.getContentType(type);
            let contentQueryAndVars = getQueryAndVariables(type, contentPath, contentTypeDef?.query, context);
            if (!contentQueryAndVars) {
                contentQueryAndVars = {
                    query: LOW_PERFORMING_DEFAULT_QUERY,
                    variables: defaultVariables(contentPath),
                }
            }
            componentDescriptors.push({
                type: contentTypeDef,
                queryAndVariables: contentQueryAndVars,
            });

            if (components?.length && typesRegistry) {
                // Collect part queries if defined
                const partDescriptors = collectPartDescriptors(components, typesRegistry, requestedComponentPath, contentPath, context);
                if (partDescriptors.length) {
                    //TODO: can be moved to part-wide propsProcessor when ready
                    processPartConfigs(APP_NAME_DASHED, partDescriptors);

                    componentDescriptors.push(...partDescriptors);
                }
            }

            const {query, variables} = combineMultipleQueries(componentDescriptors);

            if (!query.trim()) {
                return errorResponse('400', `Missing or empty query override for content type ${type}`)
            }

            /////////////////    SECOND GUILLOTINE CALL FOR DATA   //////////////////////
            const contentResults = await fetchContentData(CONTENT_API_URL, contentPath, query, variables);
            /////////////////////////////////////////////////////////////////////////////

            // Apply processors to every component
            const datas = await applyProcessors(componentDescriptors, contentResults, context);

            //  Unwind the data back to components
            const content = datas[0];
            for (let i = 1; i < datas.length; i++) {
                // component descriptors hold references to components
                // that will later be used for creating page regions
                componentDescriptors[i].component!.data = datas[i];
            }

            const page = createPageData(type, components);
            const meta = createMetaData(type, siteRelativeContentPath, requestType, renderMode, requestedComponentPath, page, components);

            return {
                content,
                meta,
                page: page || null,
            } as FetchContentResult;

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
            return errorResponse(error.code, error.message);
        }
    };
};


//////////////////////////////  ENTRY 2: ready-to-use fetchContent function

/**
 * Default fetchContent function, built with params from imports.
 * It runs custom content-type-specific guillotine calls against an XP guillotine endpoint, returns content data, error and some meta data
 * Sends one query to the guillotine API and asks for content type, then uses the type to select a second query and variables, which is sent to the API and fetches content data.
 * @param contentPath string or string array: local (site-relative) path to a content available on the API (by XP _path - obtainable by running contentPath through getXpPath). Pre-split into string array, or already a slash-delimited string.
 * @param context object from Next, contains .query info
 * @returns FetchContentResult object: {data?: T, error?: {code, message}}
 */
export const fetchContent: ContentFetcher = buildContentFetcher<EnonicConnectionConfig>({
    ...enonicConnectionConfig,
    typesRegistry: TypesRegistry,
});
