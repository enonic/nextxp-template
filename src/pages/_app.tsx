import type {AppProps} from 'next/app'


import '../styles/globals.css'

import React from 'react';
import Head from "next/head";


/**
 *
 * @param Component Usually triggering [[...contentPath]].tsx, this component is BasePage.tsx
 * @param pageProps {{content, common, meta, error}}
 */
function MyApp({Component, pageProps}: AppProps) {
    // In single-component rendering mode, only render the component. This is problematic to do dynamically in Next.js, so we leave that to post-processing in the proxy.
    if (pageProps.meta?.xpRequestType === 'component') {

        // TODO: PLACEHOLDER - actually render updated single component
        return (
            <>
                <details data-single-component-output="true">
                    <Component {...pageProps} />
                </details>
            </>
        );
    }




    // const renderMode = pageProps.meta.renderMode;

    return (
        <>
            {   !pageProps.meta?.xpRequestType && (
                <Head>
                    <base href='/' />
                </Head>
            )}

            <Component {...pageProps} />
        </>
    );
}

export default MyApp
