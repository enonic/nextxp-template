import type {AppProps} from 'next/app'

/**
 * Main Next.js component wrapper. Use to add elements that should be present on all pages (headers, footers, etc).
 *
 * @param Component Usually BasePage.tsx
 * @param pageProps {{content, meta, error}} pageProps will be whatever is sent in as `props` from top-level getServerSideProps etc., usually from [[...contentPath]].tsx
 */
function MyApp({Component, pageProps}: AppProps) {
    return (
        <Component {...pageProps} />
    );
}

export default MyApp
