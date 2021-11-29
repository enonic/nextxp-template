import React from "react"

// fully qualified XP content-type name:
export const LIST_CONTENTTYPE_NAME = `base:folder`;

const ListView = ({content}) => {
    const {displayName, children} = content;

    return (
        <>
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
        </>
    );
};

export default ListView;
