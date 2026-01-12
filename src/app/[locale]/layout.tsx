import {I18n, PORTAL_COMPONENT_ATTRIBUTE} from '@enonic/nextjs-adapter';
import {Metadata} from 'next';
import {ReactNode} from 'react';

import '../../styles/globals.css';

import {PageProps} from './[[...contentPath]]/page';

type LayoutProps = {
    params: Promise<PageProps>
    children: ReactNode
}

export default async function LocaleLayout({params, children}: LayoutProps) {

    // we only have locale in the params on the [locale] level
    const resolvedParams = await params;
    await I18n.setLocale(resolvedParams.locale);

    const bodyAttrs: { [key: string]: string } = {
        className: "edit",
        [PORTAL_COMPONENT_ATTRIBUTE]: "page"
    }

    return (<html lang="en">
        <body {...bodyAttrs}>
        {children}
        </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: {
        default: I18n.localize('title'),
        template: '%s | Next.XP',
    },
    description: 'The React Framework for Enonic XP',
}
