'use client' // Error components must be Client Components

import {IS_DEV_MODE} from '@enonic/nextjs-adapter/env';
import {useEffect} from 'react'
import styles from '../../styles/error.module.css';

type ErrorProps = {
    error: Error & { digest?: string },
    reset: () => void,
}

export default function Error({error, reset}: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    console.info(JSON.stringify(error, null, 2));

    return (
        <div className={styles.fivehundred}>
            <h1>Something went wrong!</h1>
            <h2>{error ? 'Server component error occurred' : 'Client side error occurred'}</h2>
            {IS_DEV_MODE && error?.stack && <pre>{error.stack}</pre>}
        </div>
    )
}
