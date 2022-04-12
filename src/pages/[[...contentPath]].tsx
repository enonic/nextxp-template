import React from 'react';
import {fetchContent, FetchContentResult} from "../_enonicAdapter/guillotine/fetchContent";
import MainView from "../_enonicAdapter/views/MainView";
import {IS_DEV_MODE, RENDER_MODE} from "../_enonicAdapter/utils";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import {ParsedUrlQuery} from 'node:querystring';

// Register component mappings
import "../_enonicAdapter/baseMappings";
import "../components/_mappings";

export interface ServerSideParams
    extends ParsedUrlQuery {
    // String array catching a sub-path assumed to match the site-relative path of an XP content.
    contentPath?: string[];
    mode?: string;
}

export type Context = GetServerSidePropsContext<ServerSideParams>;

// SSR

export const getServerSideProps: GetServerSideProps = async (context: Context): Promise<GetServerSidePropsResult<FetchContentResult>> => {
    const {
        common = null,
        data = null,
        meta,
        error = null,
        page = null,
    } = await fetchContent(context.params?.contentPath || [], context);


    // HTTP 500
    if (error && error.code === '500') {
        throw error
    }

    // catch-all rendering is ignored for isRenderableRequest in edit mode to allow selecting descriptors in page editor
    if (meta && (!meta.canRender || meta.catchAll && isRenderableRequestEditMode(context))) {
        context.res.statusCode = meta.renderMode !== RENDER_MODE.NEXT ? 418 : 404;
    }

    let catchAllInNextProdMode = meta?.renderMode === RENDER_MODE.NEXT && !IS_DEV_MODE && meta?.catchAll;

    return {
        // HTTP 404
        notFound: (error && error.code === '404') || context.res.statusCode === 404 || catchAllInNextProdMode || undefined,
        props: {
            common,
            data,
            meta,
            error,
            page,
        }
    }
};

function isRenderableRequestEditMode(context: Context): boolean {
    const method = context.req.method;
    const mode = context.query['mode'];
    return method === 'HEAD' && mode === RENDER_MODE.EDIT;
}

export default MainView;
