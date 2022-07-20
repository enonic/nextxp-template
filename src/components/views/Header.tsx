import React from 'react'
import Link from 'next/link';
import {getUrl} from '../../_enonicAdapter/utils';

export interface HeaderProps {
    title: string;
    logoUrl: string;
    path: string;
}


const Header = ({title, logoUrl, path}: HeaderProps) => {

    return (<header
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
                {title && (
                    <h1 style={{margin: 0}}>
                        <Link
                            href={getUrl('')}>
                            <a style={{
                                color: `white`,
                                textDecoration: `none`,
                            }}
                            >
                                {title}
                            </a>
                        </Link>
                    </h1>
                )}
                <a href="javascript:void(0);" style={{color: '#fff', alignSelf: 'center', margin: '0 10px 0 auto'}}
                   onClick={revalidateRequest(path)}>Revalidate</a>
                {logoUrl && (
                    <img src={logoUrl}
                         width={33}
                         height={40}
                         alt={"Enonic XP logo"}
                    />
                )}
            </div>
        </header>
    )
};

function revalidateRequest(path: string) {
    const encPath = encodeURIComponent(getUrl(path));
    const encToken = encodeURIComponent(process.env.NEXT_PUBLIC_API_TOKEN as string);
    const url = `/api/revalidate?path=${encPath}&token=${encToken}`;
    return function () {
        fetch(url, {
            credentials: "include"
        })
            .then((result) => result.json())
            .then(json => {
                console.info(json);
                if (json.revalidated && location) {
                    location.reload();
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
}


export default Header
