import {fetchContent, getAsset, I18n, LocaleContextProvider, PORTAL_COMPONENT_ATTRIBUTE} from '@enonic/nextjs-adapter';
import {Metadata} from 'next';
import {ReactNode} from 'react';

import '../../styles/globals.css';
import Footer from '../../components/views/Footer';
import Header from '../../components/views/Header';

import {PageProps} from './[[...contentPath]]/page';

export type LayoutProps = {
    params: PageProps
    children: ReactNode
}

export default async function RootLayout({params, children}: LayoutProps) {

    await I18n.setLocale(params.locale);

    const bodyAttrs: { [key: string]: string } = {
        className: "edit",
        [PORTAL_COMPONENT_ATTRIBUTE]: "page"
    }

    const {meta} = await fetchContent(params);

    return (
        <html lang="en">
        <body {...bodyAttrs}>
        <LocaleContextProvider locale={params.locale}>
            <Header meta={meta} title={I18n.localize('title')} logoUrl={getAsset('/images/xp-shield.svg', meta)}/>
            <main>{children}</main>
            <Footer/>
        </LocaleContextProvider>
        </body>
        </html>
    )
}

export const metadata: Metadata = {
    title: {
        default: I18n.localize('title'),
        template: '%s | Next.XP',
    },
    description: 'The React Framework for Enonic XP',
}
