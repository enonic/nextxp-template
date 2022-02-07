import React from 'react';

import {fetchContent, FetchContentResult} from "../cmsAdapter/guillotine/fetchContent";

import MainView from "../cmsAdapter/views/_MainView";
import {getPublicAssetUrl, XP_RENDER_MODE} from "../cmsAdapter/constants";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import {ParsedUrlQuery} from 'node:querystring';

// Register Standard Components
import "../cmsAdapter/baseMappings";
// Register Custom Components
import "../components/mappings";

export interface ServerSideParams
    extends ParsedUrlQuery {
    // String array catching a sub-path assumed to match the site-relative path of an XP content.
    contentPath?: string[];
}

export type Context = GetServerSidePropsContext<ServerSideParams>;

////////////////////////////////////////////////////////////////////////////////////////////// SSR:

export const getServerSideProps: GetServerSideProps = async (context: Context): Promise<GetServerSidePropsResult<FetchContentResult>> => {
    const {
        content = null,
        meta,
        error = null,
        page = null,
    } = await fetchContent(context.params?.contentPath || [], context);

    // throw it to be handled by nextjs error page
    if (error && error.code === '500') {
        throw error
    }

    // return 418 if not able to render
    if (meta && !meta.canRender && meta.renderMode != XP_RENDER_MODE.EDIT) {
        context.res.statusCode = 418;
    }

    return {
        // tells nextjs to render 404 page
        notFound: (error && error.code === '404') || undefined,
        props: {
            content: {
                ...content,

                // Injecting into props some values used in the header:
                layoutProps: {
                    title: content?.displayName || "Next.JS",
                    logoUrl: getPublicAssetUrl('images/xp-shield.svg', context),
                }

            },
            meta,
            error,
            page,
        }
    }
};

export default MainView;
