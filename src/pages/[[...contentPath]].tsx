import React from 'react';
import {ContentApiBaseBody, Context, fetchContent, fetchGuillotine} from "../_enonicAdapter/guillotine/fetchContent";
import MainView from "../_enonicAdapter/views/MainView";
import {getContentApiUrl, IS_DEV_MODE, RENDER_MODE} from "../_enonicAdapter/utils";

// Register component mappings
import "../_enonicAdapter/baseMappings";
import "../components/_mappings";

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

    let canNotRender = false;
    // we can not set 418 for static paths,
    // but we can show 404 instead to be handled in CS
    if (meta && !meta.canRender && meta.renderMode !== RENDER_MODE.EDIT) {
        canNotRender = true;
    }

    let catchAllInNextProdMode = meta?.renderMode === RENDER_MODE.NEXT && !IS_DEV_MODE && meta?.catchAll;

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
    }
}

function populateXPHeaders(context: Context) {
    const pd = context.previewData;
    if (!pd?.headers) {
        return;
    }
    const req = context.req || {};
    req.headers = Object.assign(req.headers || {}, pd.headers);
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

async function doRecursiveFetch(contentApiUrl: string, path: string, maxLevel: number = 0, filter?: (content: any) => boolean, paths?: Item[], currLevel: number = 1): Promise<Item[]> {
    const body: ContentApiBaseBody = {
        query,
        variables: {path}
    };

    const result = await fetchGuillotine(contentApiUrl, body, path);

    return result?.guillotine?.getChildren.reduce(async (prevPromise: Promise<Item[]>, child: any) => {
        const prev = await prevPromise;
        if (filter && !filter(child)) {
            return prev;
        }

        prev.push({
            params: {
                contentPath: child._path.replace(`/${child.site?._name}/`, '').split('/')
            }
        });

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
