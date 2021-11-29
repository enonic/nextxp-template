import React from 'react';

import {fetchContent} from "../xpAdapter/guillotine/fetchContent";

import MainView from "../xpAdapter/views/_MainView";
import {getPublicAssetUrl} from "../enonic-connection-config";

export type Context = {
    params: {

        // String array catching a sub-path assumed to match the site-relative path of an XP content.
        contentPath: string[]
    },
    query: {

        // The XP preview proxy injects the '__fromXp__' parameter.  It's used here
        // to make some adaptations in the rendered and returned code, adapting to some postprocessing needed for the CS preview to work.
        [key: string]: string | boolean
    },
    req: {
        mode: string,
        headers?: { [key: string]: string }
    }
};

const mainHeading = "Next.xp"

////////////////////////////////////////////////////////////////////////////////////////////// SSR:

export const getServerSideProps = async (context: Context) => {
    const {
        content,
        meta = null,
        error = null,
        page = null,
    } = await fetchContent(context.params.contentPath, context);

    return {
        props: {
            content: {
                ...content,
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
