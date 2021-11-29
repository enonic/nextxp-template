import React from "react"
import Layout from "../../../components/blocks/Layout";

// fully qualified XP content-type name:
export const LIST_CONTENTTYPE_NAME = `base:folder`;

const ListView = ({content}) => {
    const {displayName, children, layoutProps} = content;

    return (
        <Layout {...layoutProps}>
            <h1>{displayName}</h1>
            {
                children &&
                <ul>{
                    children.map((child, i) => (
                            <li key={i}>
                                <a href={child._path}>
                                    {child.displayName}
                                </a>
                            </li>
                        )
                    )
                }</ul>
            }
        </Layout>
    );
};

export default ListView;
