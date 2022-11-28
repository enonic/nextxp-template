import React from 'react';
import {Context, fetchContent, IS_DEV_MODE, RENDER_MODE} from "@enonic/nextjs-adapter";
import Empty from "@enonic/nextjs-adapter/views/Empty";

// Register component mappings
import "@enonic/nextjs-adapter/baseMappings";
import "../components/_mappings";

export async function getServerSideProps(context: Context) {
    const path = context.query.contentPath || [];

    console.info(`Is renderable request for: ${path}`);

    const {
        meta,
        error = null,
    } = await fetchContent(path, context);

    // HTTP 500
    if (error && error.code === '500') {
        throw error
    }

    // catch-all rendering is ignored for isRenderableRequest in edit mode
    // to allow selecting descriptors in page editor
    if (meta && (!meta.canRender || meta.catchAll && isRenderableRequestEditMode(context))) {
        context.res.statusCode = meta.renderMode !== RENDER_MODE.NEXT ? 418 : 404;
    }

    let catchAllInNextProdMode = meta?.renderMode === RENDER_MODE.NEXT && !IS_DEV_MODE && meta?.catchAll;

    const notFound = (error && error.code === '404') || context.res?.statusCode === 404 || catchAllInNextProdMode || undefined;

    return {
        notFound,
        props: {}
    }
}

function isRenderableRequestEditMode(context: Context): boolean {
    const method = context.req.method;
    const mode = context.query['mode'];
    return method === 'HEAD' && mode === RENDER_MODE.EDIT;
}

export default Empty;
