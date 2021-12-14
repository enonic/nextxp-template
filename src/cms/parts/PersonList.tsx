import React from "react"
import {APP_NAME} from "../../xpAdapter/enonic-connection-config";
import {PartProps} from './_Part';
import {Context} from '../../pages/[[...contentPath]]';
import {VariablesGetterResult} from '../../xpAdapter/TypesRegistry';

// fully qualified XP part name:
export const PERSONLIST_PART_NAME = `${APP_NAME}:personList`;


const PersonList = (props: PartProps) => {
    const {displayName, children} = props.content;
    return (
        <main style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem`,
        }}>
            <h2>{props.part?.config?.heading || displayName}</h2>
            {
                children &&
                <ul>{
                    children.map((child: any, i: number) => (
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

export const PERSONLIST_QUERY = {
    query: '',
    variables: function (path: string, context?: Context): VariablesGetterResult {
        return {
            path
        }
    }
};

export function personListProcessor(content: any, context?: Context) {
    return content;
}
