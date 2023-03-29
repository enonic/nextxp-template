import React from 'react';
import {
    ContentApiBaseBody,
    Context,
    fetchContent,
    fetchGuillotine,
    getContentApiUrl,
    IS_DEV_MODE,
    RENDER_MODE,
    XP_COMPONENT_TYPE
} from "@enonic/nextjs-adapter";
import MainView from "@enonic/nextjs-adapter/views/MainView";

// Register component mappings
import "@enonic/nextjs-adapter/baseMappings";
import "../components/_mappings";
import {PageComponent, PageRegion, RegionTree} from '@enonic/nextjs-adapter/guillotine/getMetaData';

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

export async function getStaticProps(context: Context) {
    const path = context.params?.contentPath || [];
    console.info(`Accessing static page ${context.preview ? '(preview) ' : ''}at: ${path}`);

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

    const notFound = (error && error.code === '404') || context.res?.statusCode === 404 || canNotRender || catchAllInNextProdMode || undefined;

    return {
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
    const contentApiUrl = getContentApiUrl();
    const paths = await recursiveFetchChildren(contentApiUrl, '\${site}/', 4);

    return {
        paths: paths,
        fallback: 'blocking',
    };
}

interface Item {
    params: { contentPath: string[] }
}

export async function recursiveFetchChildren(contentApiUrl: string, path: string, maxLevel: number = 3, filter: (content: any) => boolean = filterUnderscores): Promise<Item[]> {
    return doRecursiveFetch(contentApiUrl, path, maxLevel, filter);
}

function collectPageComponentUrls(regions: RegionTree, contentPath: string): Item[] {
    let items: Item[] = [];
    Object.values(regions).forEach((region: PageRegion) => {
        region.components.forEach((comp: PageComponent) => {
            if (comp.type !== XP_COMPONENT_TYPE.LAYOUT) {
                items.push({
                    params: {
                        contentPath: `${contentPath}/_/component${comp.path}`.split('/')
                    }
                })
            } else if (comp.regions) {
                const subUrls = collectPageComponentUrls(comp.regions, contentPath);
                if (subUrls.length) {
                    items = items.concat(subUrls);
                }
            }
        })
    });
    return items;
}

async function doRecursiveFetch(contentApiUrl: string, path: string, maxLevel: number = 0, filter?: (content: any) => boolean, paths?: Item[], currLevel: number = 1): Promise<Item[]> {
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
            }
        });

        // also push all the component urls
        if (child.pageAsJson?.regions) {
            const compUrls = collectPageComponentUrls(child.pageAsJson?.regions, contentPath);
            if (compUrls.length) {
                prev = prev.concat(compUrls);
            }
        }

        if ((maxLevel === 0 || currLevel < maxLevel) &&
            (child.contentType?.name === 'base:folder' || child.contentType?.superType === 'base:folder')) {

            await doRecursiveFetch(contentApiUrl, child._path, maxLevel, filter, prev, currLevel + 1);
        }
        return prev;
    }, paths || [{
        params: {
            contentPath: [''],
        }
    }]);
}

function filterUnderscores(child: any): boolean {
    return child._name && !child._name.startsWith("_");
}

export default MainView;
