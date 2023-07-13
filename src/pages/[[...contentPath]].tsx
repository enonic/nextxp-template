import React from 'react';
import {
    ContentApiBaseBody,
    Context,
    fetchContent,
    FetchContentResult,
    fetchGuillotine,
    getContentApiUrl,
    getProjectsConfig,
    getUrl,
    IS_DEV_MODE,
    RENDER_MODE,
    XP_COMPONENT_TYPE
} from "@enonic/nextjs-adapter";
import MainView from '@enonic/nextjs-adapter/views/MainView';
import {PageComponent, PageRegion, RegionTree} from '@enonic/nextjs-adapter/guillotine/getMetaData';

// Register component mappings
import "@enonic/nextjs-adapter/baseMappings";
import "../components/_mappings";
import {GetStaticPropsResult, Redirect} from 'next';

const query = `query($path: ID) {
                  guillotine {
                    getChildren(key: $path) {
                      _path
                      _name
                      site {
                        _name
                      }
                      contentType {
                        superType
                        name
                      }
                      pageAsJson
                    }
                  }
                }`;

export async function getStaticProps(context: Context): Promise<GetStaticPropsResult<FetchContentResult>> {
    const path = context.params?.contentPath || [];
    console.info(`Accessing static page (locale=${context.locale}) ${context.preview ? '(preview) ' : ''}at: ${path}`);

    if (context.preview) {
        populateXPHeaders(context);
    }

    const {
        common = null,
        data = null,
        meta,
        error = null,
        page = null,
    } = await fetchContent(path, context);

    // HTTP 500
    if (error && error.code === '500') {
        throw error
    }

    // we can not set 418 for static paths,
    // but we can show 404 instead to be handled in CS
    const canNotRender = meta && !meta.canRender && meta.renderMode !== RENDER_MODE.EDIT;

    const catchAllInNextProdMode = meta?.renderMode === RENDER_MODE.NEXT && !IS_DEV_MODE && meta?.catchAll;

    const props = {
        common,
        data,
        meta,
        error,
        page,
    }

    let notFound = (error && error.code === '404') || context.res?.statusCode === 404 || canNotRender || catchAllInNextProdMode || undefined;
    // We want to redirect shortcuts so they work with next
    // Edit mode should be stopped so redirects don't trigger in content studio
    let redirect: Redirect | undefined = undefined;

    if (meta.type == "base:shortcut" &&
        data?.get?.data?.target?.pageUrl &&
        meta.renderMode === RENDER_MODE.NEXT) {
        redirect = {
            statusCode: 307,
            destination: getUrl(data.get.data.target.pageUrl, meta)
        };

        // Cant have 404 and redirect at the same time
        notFound = undefined;
    }

    return {
        redirect,
        notFound,
        props,
        revalidate: 3600,   // In seconds, meaning every hour
    }
}

function populateXPHeaders(context: Context) {
    const pd = context.previewData;
    if (!pd) {
        return;
    }
    const req = context.req || {};
    req.headers = Object.assign(req.headers || {}, pd.headers);
    context.params = Object.assign(context.params || {}, pd.params);
    context.req = req;
}

export async function getStaticPaths() {
    const paths = await recursiveFetchAllLocales('\${site}/', 4);
    return {
        paths: paths,
        fallback: 'blocking',
    };
}

interface Item {
    params: { contentPath: string[] },
    locale?: string,
}

export async function recursiveFetchAllLocales(path: string, maxLevel: number = 3, filter: (content: any) => boolean = filterUnderscores): Promise<Item[]> {
    const promises = Object.keys(getProjectsConfig()).map(locale => recursiveFetchLocale(path, locale, maxLevel, filter));
    return (await Promise.all(promises)).reduce((all, localePaths) => all.concat(localePaths), []);
}

export async function recursiveFetchLocale(path: string, locale: string, maxLevel: number = 3, filter: (content: any) => boolean = filterUnderscores): Promise<Item[]> {
    const contentApiUrl = getContentApiUrl({locale});
    return doRecursiveFetch(contentApiUrl, path, locale, maxLevel, filter);
}

function collectPageComponentUrls(regions: RegionTree, contentPath: string, locale: string): Item[] {
    let items: Item[] = [];
    Object.values(regions).forEach((region: PageRegion) => {
        region.components.forEach((comp: PageComponent) => {
            if (comp.type !== XP_COMPONENT_TYPE.LAYOUT) {
                items.push({
                    params: {
                        contentPath: `${contentPath}/_/component${comp.path}`.split('/')
                    },
                    locale: normalizeLocale(locale),
                })
            } else if (comp.regions) {
                const subUrls = collectPageComponentUrls(comp.regions, contentPath, locale);
                if (subUrls.length) {
                    items = items.concat(subUrls);
                }
            }
        })
    });
    return items;
}

async function doRecursiveFetch(contentApiUrl: string, path: string, locale: string, maxLevel: number = 0, filter?: (content: any) => boolean, paths?: Item[], currLevel: number = 1): Promise<Item[]> {
    const body: ContentApiBaseBody = {
        query,
        variables: {path}
    };

    const result = await fetchGuillotine(contentApiUrl, body);

    return result?.guillotine?.getChildren.reduce(async (prevPromise: Promise<Item[]>, child: any) => {
        let prev = await prevPromise;
        if (filter && !filter(child)) {
            return prev;
        }

        const contentPath = child._path.replace(`/${child.site?._name}/`, '');
        prev.push({
            params: {
                contentPath: contentPath.split('/')
            },
            locale: normalizeLocale(locale),
        });

        // also push all the component urls for direct links to components (i.e. A/B systems)
        if (child.pageAsJson?.regions) {
            const compUrls = collectPageComponentUrls(child.pageAsJson?.regions, contentPath, locale);
            if (compUrls.length) {
                prev = prev.concat(compUrls);
            }
        }

        if ((maxLevel === 0 || currLevel < maxLevel) &&
            (child.contentType?.name === 'base:folder' || child.contentType?.superType === 'base:folder' || child.hasChildren)) {

            await doRecursiveFetch(contentApiUrl, child._path, locale, maxLevel, filter, prev, currLevel + 1);
        }
        return prev;
    }, paths || [{
        params: {
            contentPath: [''],
        },
        locale: normalizeLocale(locale),
    }]);
}

function normalizeLocale(locale: string): string | undefined {
    return locale !== 'default' ? locale : undefined;
}

function filterUnderscores(child: any): boolean {
    return child._name && !child._name.startsWith("_");
}

export default MainView;
