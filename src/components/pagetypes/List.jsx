import React from "react"

const ListPage = (props) => {
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

export default ListPage;
