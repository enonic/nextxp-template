import React from "react"
import {PartProps} from '../../../cmsAdapter/views/_BasePart';
import {Context} from '../../../pages/[[...contentPath]]';
import {VariablesGetterResult} from '../../../cmsAdapter/TypesRegistry';

const PersonList = (props: PartProps) => {
    const {data} = props;
    const personsContent = data.get;
    const displayName = `${data.getSite.displayName} - ${personsContent.displayName}`;
    const children = personsContent.children;
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

export const PersonListQuery = {
    query: `query ($parentKey: ID) {
              guillotine {
                getSite {
                  displayName
                }
                get(key: $parentKey) {
                  displayName
                  children {
                      _path
                      _id
                      displayName
                  }
                }
              }
            }`,
    variables: function (path: string, context?: Context): VariablesGetterResult {
        return {
            path,
            parentKey: "ff9e01f1-9284-453e-9900-9178104d3258"
        }
    }
};

export async function personListProcessor(content: any, context?: Context): Promise<any> {
    return content;
}
