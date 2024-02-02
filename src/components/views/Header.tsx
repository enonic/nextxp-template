import React from 'react'
import styles from './Header.module.css';
import {getUrl, MetaData} from "@enonic/nextjs-adapter";

export interface HeaderProps {
    title: string;
    logoUrl: string;
    meta: MetaData;
}


const Header = ({title, logoUrl, meta}: HeaderProps) => {

    return <header className={styles.header}>
        <div className={styles.wrapper}>
            {title && (
                <h1>
                    <a href={getUrl('/', meta)}>{title}</a>
                </h1>
            )}
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

export default Header
