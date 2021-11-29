import React from "react"

// fully qualified XP content-type name:
export const LIST_CONTENTTYPE_NAME = `base:folder`;

const ListView = (props) => {
    const {displayName, children} = props.content;

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
