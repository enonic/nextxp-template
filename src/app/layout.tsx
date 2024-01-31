import {Metadata} from 'next';
import {ReactNode} from 'react';

import '../styles/globals.css';


type LayoutProps = {
    children: ReactNode
}

/* RootLayout is required by Next.js */
export default async function RootLayout({children}: LayoutProps) {

    return (<>{children}</>);
}

export const metadata: Metadata = {
    title: 'Next.XP',
    description: 'The React Framework for Enonic XP',
}
