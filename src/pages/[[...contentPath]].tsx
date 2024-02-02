import React from 'react';
import {Context, createResponse, fetchContent, fetchContentPathsForAllLocales, FetchContentResult} from "@enonic/nextjs-adapter";
import MainView from '@enonic/nextjs-adapter/views/MainView';

// Register component mappings
import "@enonic/nextjs-adapter/baseMappings";
import "../components/_mappings";
import {GetStaticPathsResult, GetStaticPropsResult} from 'next';

export async function getStaticProps(context: Context): Promise<GetStaticPropsResult<FetchContentResult>> {
    const path = context.params?.contentPath || [];
    console.info(`Accessing static page (locale=${context.locale}) ${context.preview ? '(preview) ' : ''}at: ${path}`);

    const props = await fetchContent(path, context);

    // HTTP 500
    if (props.error && props.error.code === '500') {
        throw props.error
    }

    return createResponse(props, context);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<any>> {
    const paths = await fetchContentPathsForAllLocales('\${site}/');
    return {
        paths: paths,
        fallback: 'blocking',
    };
}

export default MainView;
