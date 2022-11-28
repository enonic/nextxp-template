import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import {PORTAL_COMPONENT_ATTRIBUTE} from '@enonic/nextjs-adapter';

class MyDocument
    extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        // https://nextjs.org/docs/advanced-features/automatic-static-optimization
        // ctx.req will be undefined for static pages
        return await Document.getInitialProps(ctx)
    }

    render() {
        const bodyAttrs: { [key: string]: string } = {
            className: "edit",
            [PORTAL_COMPONENT_ATTRIBUTE]: "page"
        }

        return (
            <Html>
                <Head/>
                <body {...bodyAttrs}>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
