import React from 'react';

import {fetchContent} from "../xpAdapter/guillotine/fetchContent";

import MainXpView from "../xpAdapter/views/_MainXpView";
import {getPublicAssetUrl} from "../xpAdapter/enonic-connection-config";

import "../cms/typesRegistration";

export type Context = {
    params: {

        // String array catching a sub-path assumed to match the site-relative path of an XP content.
        contentPath: string[]
    },
    query: {
        [key: string]: string | boolean
    },
    req: {
        mode: string,

        // The XP preview proxy injects some parameters. They are used here on the Next.js
        // to make some adaptations in the rendered and returned code, adapting to some postprocessing needed for the CS preview to work.
        headers?: { [key: string]: string }
    }
};


////////////////////////////////////////////////////////////////////////////////////////////// SSR:

export const getServerSideProps = async (context: Context) => {
    const {
        content = null,
        meta = null,
        error = null,
        page = null,
    } = await fetchContent(context.params.contentPath, context);

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
