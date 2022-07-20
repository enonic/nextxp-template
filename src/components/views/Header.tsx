import React from 'react'
import Link from 'next/link';
import {getUrl} from '../../_enonicAdapter/utils';
import styles from './Header.module.css';

export interface HeaderProps {
    title: string;
    logoUrl: string;
    path: string;
}


const Header = ({title, logoUrl, path}: HeaderProps) => {

    return <header className={styles.header}>
        <div className={styles.wrapper}>
            {title && (
                <h1>
                    <Link href={getUrl('')}>
                        <a>{title}</a>
                    </Link>
                </h1>
            )}
            <a href="javascript:void(0);" onClick={revalidateRequest(path)}>Revalidate</a>
            {logoUrl && (
                <img src={logoUrl}
                     width={33}
                     height={40}
                     alt={"Enonic XP logo"}
                />
            )}
        </div>
    </header>
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
