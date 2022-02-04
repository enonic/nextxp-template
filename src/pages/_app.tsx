import type {AppProps} from 'next/app'
import '../styles/globals.css'
import React from 'react';
import Head from "next/head";
import Layout from "../components/blocks/Layout";
import {XP_REQUEST_TYPE} from '../cmsAdapter/constants';

/**
 * Wraps all rendered components
 * @param Component Usually triggering [[...contentPath]].tsx, this component is BasePage.tsx
 * @param pageProps {{content, common, meta, error}}
 */
function MyApp({Component, pageProps}: AppProps) {

    // Supports component add/update (without full page refresh) when using Enonic's WYSIWYG editor
    if (pageProps.meta) {
        if (pageProps.meta.requestType === XP_REQUEST_TYPE.COMPONENT) {
            return <details data-single-component-output="true"><Component {...pageProps} /></details>;
        } else if (!pageProps.meta.canRender) {
            // return empty page, status is set in [[...contentPath.tsx]]
            return null;
        }
    }

    // MAIN RENDERING:
    return (
        <Layout {...pageProps?.content?.layoutProps}>
            {!pageProps.meta?.requestType && (
                <Head>
                    <base href='/'/>
                </Head>
            )}
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp