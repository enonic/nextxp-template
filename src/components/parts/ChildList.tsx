import React from "react"
import {PartProps} from '../../cmsAdapter/views/_BasePart';
import {Context} from '../../pages/[[...contentPath]]';
import {VariablesGetterResult} from '../../cmsAdapter/TypesRegistry';

const ChildList = (props: PartProps) => {
    const {data} = props;
    const listContent = data.get;
    const displayName = `${data.getSite.displayName} - ${listContent.displayName}`;
    const children = listContent.children;
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

export default ChildList;

export const ChildListQuery = {
    query: `query($path:ID!, $order:String){
              guillotine {
                getSite {
                  displayName
                }
                get(key:$path) {
                  displayName
                  children(sort: $order) {
                      _path(type: siteRelative)
                      _id
                      displayName
                  }
                }
              }
            }`,
    variables: function (path: string, context?: Context): VariablesGetterResult {
        return {
            path,
            order: "displayName ASC"
        }
    }
};

export async function childListProcessor(content: any, context?: Context): Promise<any> {
    return content;
}
