import React from "react"
import Link from "next/link";


const Header = ({ title, logoUrl }) => {

    return (
        <header
            style={{
                background: `rebeccapurple`,
                marginBottom: `1.45rem`,
            }}
        >
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `1.45rem 1.0875rem`,
                    display: `flex`,
                    justifyContent: 'space-between'
                }}
            >
                <h1 style={{margin: 0}}>
                    <Link
                        href="/">
                        <a style={{
                            color: `white`,
                            textDecoration: `none`,
                        }}
                        >
                            {title}
                        </a>
                    </Link>
                </h1>
                <img src={logoUrl}
                       width={33}
                       height={40}
                       alt={"Enonic XP logo"}
                />
            </div>
        </header>
    )
}

export default Header
