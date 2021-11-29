import React from "react"
import {APP_NAME} from "../../xpAdapter/enonic-connection-config";

// fully qualified XP part name:
export const PERSONLIST_PART_NAME = `${APP_NAME}:personList`;


type Props = Record<string, any>;

const PersonList = ({part, content}: Props) => {
    const {displayName, children} = content;
    return (
        <main style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem`,
        }}>
            <h2>{part?.config?.heading || displayName}</h2>
            {
                children &&
                <ul>{
                    children.map((child, i) => (
                        <li key={i}>
                            <a href={child._path}>
                                {child.displayName}
                            </a>
                        </li>
                    ))
                }</ul>
            }
        </main>
    );
};

export default PersonList;
