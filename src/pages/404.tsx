import styles from './404.module.css';

export default function Custom404() {
    return <div className={styles.fourohfour}>
        <h1>404</h1>
        <h2>Not Found</h2>
    </div>
}

export function getStaticProps() {
    return {props: {}}
}