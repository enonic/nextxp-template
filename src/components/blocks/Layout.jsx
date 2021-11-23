import React from "react"

import Link from 'next/link';

import Header from "./Header"

const Layout = ({title, logoUrl, children}) => {

    return (
        <>
            <Header title={title} logoUrl={logoUrl} />
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `0 1.0875rem 1.45rem`,
                }}
            >
                <main>{children}</main>

                <footer>
                    <br />
                    <hr />
                    <br/>
                    © {new Date().getFullYear()}, Built with
                    {` `}
                    <Link href="https://nextjs.org"><a>Next.js</a></Link>
                    {` `}
                    Powered by
                    {` `}
                    <Link href="https://enonic.com"><a>Enonic XP</a></Link>
                </footer>
            </div>
        </>
    )
}

export default Layout;
