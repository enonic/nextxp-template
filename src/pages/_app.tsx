import type {AppProps} from 'next/app'


import '../styles/globals.css'

import Seo from '../components/blocks/Seo'
import Layout from '../components/blocks/Layout'
import React from 'react';

const mainHeading = "Next.xp"

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
                <details data-remove-above="true"></details>
                <Component {...pageProps} />
                <details data-remove-below="true"></details>
            </>
        );
    }


    const subHeading = pageProps.common?.header?.title || "PoC";
    const layoutProps = {
        title: mainHeading + ": " + subHeading,
        logoUrl: pageProps.common?.header?.logoUrl
    }

    // const renderMode = pageProps.meta.renderMode;

    return (
        <>
            <Layout {...layoutProps}>
                <Seo title={subHeading} siteTitle={mainHeading}/>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp
