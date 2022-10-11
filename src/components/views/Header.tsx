import React from 'react'
import styles from './Header.module.css';
import {MetaData} from "../../_enonicAdapter/guillotine/getMetaData";
import {getUrl} from "../../_enonicAdapter/UrlProcessor";

export interface HeaderProps {
    title: string;
    logoUrl: string;
    path: string;
    meta: MetaData;
}


const Header = ({title, logoUrl, path, meta}: HeaderProps) => {

    return <header className={styles.header}>
        <div className={styles.wrapper}>
            {title && (
                <h1>
                    <a href={getUrl('', meta)}>{title}</a>
                </h1>
            )}
            <a href="javascript:void(0);" onClick={revalidateRequest(getUrl(path, meta))}>Revalidate</a>
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
    const encPath = encodeURIComponent(path);
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
