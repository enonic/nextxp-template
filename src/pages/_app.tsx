import type {AppProps} from 'next/app'


import '../styles/globals.css'

import React from 'react';
import Head from "next/head";
import Layout from "../components/blocks/Layout";

import "../customXp/contentSelector";
import "../customXp/componentSelector";
import "../customXp/partSelector";
import "../customXp/layoutSelector";


/**
 * Wraps all rendered components
 * @param Component Usually triggering [[...contentPath]].tsx, this component is BasePage.tsx
 * @param pageProps {{content, common, meta, error}}
 */
function MyApp({Component, pageProps}: AppProps) {

    // Special case: in XP single-component rendering mode (used in edit mode when updating one targeted component without reloading the page),
    // only render the component surrounded by tags needed by post-processing in the proxy:
    if (pageProps.meta?.xpRequestType === 'component') {
        return <details data-single-component-output="true"><Component {...pageProps} /></details>;
    }


    // MAIN RENDERING:
    return (
        <Layout {...pageProps?.content?.layoutProps}>
            {   !pageProps.meta?.xpRequestType && (
                <Head>
                    <base href='/' />
                </Head>
            )}

            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp
