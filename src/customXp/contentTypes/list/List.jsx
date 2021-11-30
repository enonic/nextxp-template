import React from "react"

const ListView = ({content}) => {
    const {displayName, children} = content;

    return (
        <>
            <h2>{displayName}</h2>
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
