import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import {PORTAL_COMPONENT_ATTRIBUTE} from '../_enonicAdapter/utils';

class MyDocument
    extends Document {

    static async getInitialProps(ctx: DocumentContext) {
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
