import React from 'react';
import {Context, fetchContent} from "../_enonicAdapter/guillotine/fetchContent";
import MainView from "../_enonicAdapter/views/MainView";
import {IS_DEV_MODE, RENDER_MODE} from '../_enonicAdapter/utils';

// Register component mappings
import "../_enonicAdapter/baseMappings";
import "../components/_mappings";

//TODO: refactor this one to ONLY handle component requests
export async function getServerSideProps(context: Context) {
    const path = context.query.contentPath || [];
    console.info(`Accessing dynamic component at: ${path}`);

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

    let catchAllInNextProdMode = meta?.renderMode === RENDER_MODE.NEXT && !IS_DEV_MODE && meta?.catchAll;

    const props = {
        common,
        data,
        meta,
        error,
        page,
    }

    const notFound = (error && error.code === '404') || context.res?.statusCode === 404 || catchAllInNextProdMode || undefined;

    return {
        notFound,
        props,
    }
}

export default MainView;
