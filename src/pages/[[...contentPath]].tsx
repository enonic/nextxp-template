import React from 'react';

import { fetchContent } from "../guillotine/fetchContent";

import BasePage from "../components/BasePage";

export type Context = {
    params: {

        // String array catching a sub-path assumed to match the site-relative path of an XP content.
        contentPath: string[]
    },
    query: {

        // The XP preview proxy injects the '__fromXp__' parameter.  It's used here
        // to make some adaptations in the rendered and returned code, adapting to some postprocessing needed for the CS preview to work.
        [fromXpParam:string]: string|boolean
    }
};




////////////////////////////////////////////////////////////////////////////////////////////// SSR:

export const getServerSideProps = async (context: Context) => {
    const {
        content = null,
        meta = null,
        error = null
    } = await fetchContent(context.params.contentPath, context);

    return {
        props: {
            content,
            meta,
            error,
        }
    }
};

export default BasePage;
