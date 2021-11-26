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
    // In single-component rendering mode, don't wrap the output, only render the component
    if (pageProps.meta?.xpRequestType === 'component') {
        return <Component {...pageProps} />;
    }


    const subHeading = pageProps.common?.header?.title || "PoC";
    const layoutProps = {
        title: mainHeading + ": " + subHeading,
        logoUrl: pageProps.common?.header?.logoUrl
    }

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
