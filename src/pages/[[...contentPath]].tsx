import React from 'react';
import {ContentApiBaseBody, Context, fetchContent, fetchGuillotine} from "../_enonicAdapter/guillotine/fetchContent";
import MainView from "../_enonicAdapter/views/MainView";
import {getContentApiUrl, IS_DEV_MODE, RENDER_MODE, setContentApiUrl} from "../_enonicAdapter/utils";

// Register component mappings
import "../_enonicAdapter/baseMappings";
import "../components/_mappings";
import {RichTextProcessor} from "../_enonicAdapter/RichTextProcessor";

const query = `query($path: ID) {
                  guillotine {
                    getChildren(key: $path) {
                      _path
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
    // catch-all rendering is ignored for isRenderableRequest in edit mode to allow selecting descriptors in page editor
    if (meta && (!meta.canRender || meta.catchAll && isRenderableRequestEditMode(context))) {
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
        revalidate: false,
    }
}

function isRenderableRequestEditMode(context: Context): boolean {
    // TODO: req.method is likely not available in static preview
    const method = context.req.method;
    const mode = context.query['mode'];
    return method === 'HEAD' && mode === RENDER_MODE.EDIT;
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
    setContentApiUrl();
    RichTextProcessor.setApiUrl(getContentApiUrl());
    const paths = await recursiveFetchChildren('\${site}/');

    return {
        paths: paths,
        fallback: 'blocking',
    };
}

interface Item {
    params: { contentPath: string[] }
}

export async function recursiveFetchChildren(path: string, paths?: Item[]): Promise<Item[]> {
    const body: ContentApiBaseBody = {
        query,
        variables: {path}
    };

    const contentApiUrl = getContentApiUrl();
    const result = await fetchGuillotine(contentApiUrl, body, path);

    return result?.guillotine?.getChildren.reduce(async (prevPromise: Promise<Item[]>, child: any) => {
        const prev = await prevPromise;
        prev.push({
            params: {
                contentPath: child._path.replace(`/${child.site?._name}/`, '').split('/')
            }
        });

        if (child.contentType?.name === 'base:folder' || child.contentType?.superType === 'base:folder') {
            await recursiveFetchChildren(child._path, prev);
        }
        return prev;
    }, paths || [{
        params: {
            contentPath: [''],
        }
    }]);
}

export default MainView;
