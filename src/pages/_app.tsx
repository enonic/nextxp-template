import type {AppProps} from 'next/app'

import Head from "next/head";

import '../styles/globals.css'

import Seo from '../components/blocks/Seo'
import Layout from '../components/blocks/Layout'
import React from 'react';

const mainHeading = "Next.xp"

export const PORTAL_COMPONENT_ATTRIBUTE = "data-portal-component-type";
export const PORTAL_REGION_ATTRIBUTE = "data-portal-region";

/**
 *
 * @param Component Usually triggering [[...contentPath]].tsx, this component is BasePage.tsx
 * @param pageProps {{content, common, meta, error}}
 */
function MyApp({Component, pageProps}: AppProps) {
    const subHeading = pageProps.common?.header?.title || "PoC";
    const layoutProps = {
        title: mainHeading + ": " + subHeading,
        logoUrl: pageProps.common?.header?.logoUrl
    }

    // const renderMode = pageProps.meta.renderMode;
    // if (renderMode == XP_RENDER_MODE.EDIT) {
    //     return (
    //         <Component {...pageProps}/>
    //     )
    // }

    return (
        <>
            {
                pageProps.meta?.baseUrl &&
                <Head>
                    <base href={pageProps.meta.baseUrl}/>
                </Head>
            }
            <Layout {...layoutProps}>
                <Seo title={subHeading} siteTitle={mainHeading}/>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp
