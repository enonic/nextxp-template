import type {AppProps} from 'next/app'

import Head from "next/head";

import '../styles/globals.css'

import Seo from '../components/blocks/Seo'
import Layout from '../components/blocks/Layout'

const mainHeading = "Next.xp"

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
    return (
        <>
            {
                pageProps.meta?.baseUrl &&
                <Head>
                    <base href={pageProps.meta.baseUrl} />
                </Head>
            }
            <Layout {...layoutProps}>
                <Seo title={subHeading} siteTitle={mainHeading} />
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
export default MyApp
