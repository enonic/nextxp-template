import React from "react"
import Head from 'next/head';

const Seo = (props) => {
    const {description, lang, meta, author, title, siteTitle, keywords, viewport} = props;
    return (
        <Head>
            <title>{
                siteTitle && title
                    ? `${title}  |  ${siteTitle}`
                    : title || siteTitle || ""
            }</title>

                            <meta name="language" content={lang || 'en'}/>
            {description && <meta name="description" content={description}/>}
            {title &&       <meta name="og:title" content={title}/>}
            {description && <meta name="og:description" content={description}/>}
                            <meta name="og:type" content="website"/>
                            <meta name="twitter:card" content="summary"/>
            {author &&      <meta name="twitter:creator" content={author}/>}
            {author &&      <meta name="author" content={author}/>}
            {title &&       <meta name="twitter:title" content={title}/>}
            {description && <meta name="twitter:description" content={description}/>}
            {keywords &&    <meta name="keywords" content={
                                    []
                                        // @ts-ignore
                                        .concat(keywords)
                                        .join(", ")
                                }/>}
            {viewport ||    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>}

            {[]
                // @ts-ignore
                .concat(meta || [])
                .map(
                    (item, idx) => <meta key={idx} name={item.name} content={item.content}/>)
            }
        </Head>
    );
}

export default Seo
