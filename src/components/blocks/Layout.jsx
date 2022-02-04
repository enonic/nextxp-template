import React from "react"

import Header from "./Header"
import Footer from "./Footer";

const Layout = ({title, logoUrl, children}) => {

    return (
        <>
            <Header title="Enonic <3 Next.js" logoUrl={logoUrl} />
            <main style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0 1.0875rem`,
            }}>{children}</main>
            <Footer />
        </>
    )
}

export default Layout;
