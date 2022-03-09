import React from 'react';
import {fetchContent, FetchContentResult} from "../_enonicAdapter/guillotine/fetchContent";
import MainView from "../_enonicAdapter/views/MainView";
import {RENDER_MODE} from "../_enonicAdapter/constants";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import {ParsedUrlQuery} from 'node:querystring';

// Register component mappings
import "../_enonicAdapter/baseMappings";
import "../components/_mappings";

export interface ServerSideParams
    extends ParsedUrlQuery {
    // String array catching a sub-path assumed to match the site-relative path of an XP content.
    contentPath?: string[];
}

export type Context = GetServerSidePropsContext<ServerSideParams>;

// SSR

export const getServerSideProps: GetServerSideProps = async (context: Context): Promise<GetServerSidePropsResult<FetchContentResult>> => {
    const {
        content = null,
        meta,
        error = null,
        page = null,
    } = await fetchContent(context.params?.contentPath || [], context);


    // HTTP 500
    if (error && error.code === '500') {
        throw error
    }

    // HTTP 418 if CMS is not configured to render item yet
    if (meta && !meta.canRender && meta.renderMode != RENDER_MODE.EDIT && meta.renderMode != RENDER_MODE.NEXT) {
        context.res.statusCode = 418;
    }

    return {
        // HTTP 404
        notFound: (error && error.code === '404') || undefined,
        props: {
            content,
            meta,
            error,
            page,
        }
    }
};

export default MainView;
