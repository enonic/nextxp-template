import React from 'react';
import {Context, fetchContent, IS_DEV_MODE, RENDER_MODE} from "@enonic/nextjs-adapter";
import MainView from "@enonic/nextjs-adapter/views/MainView";

// Register component mappings
import "@enonic/nextjs-adapter/baseMappings";
import "../components/_mappings";

// TODO: Components are now handled by [[...contentPath]].tsx
//  Keeping for backwards compatibility
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
