import React from 'react';

import {fetchContent, FetchContentResult} from "../xpAdapter/guillotine/fetchContent";

import MainXpView from "../xpAdapter/views/_MainXpView";
import {getPublicAssetUrl} from "../xpAdapter/enonic-connection-config";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import {ParsedUrlQuery} from 'node:querystring';
import "../cms/typesRegistration";

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

    // return 501 if not able to render
    if (meta && !meta.canRender) {
        context.res.statusCode = 501;
    }

    return {
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

export default MainXpView;
