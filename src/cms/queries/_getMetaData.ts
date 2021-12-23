import {XP_COMPONENT_TYPE, XP_RENDER_MODE, XP_REQUEST_TYPE} from "../../xpAdapter/enonic-connection-config";

const COMPONENTS_QUERY = `
        type
        path
        page {
          descriptor
          template {
            _path
          }
        }
        layout {
          descriptor
          configAsJson
        }
        text {
          value(processHtml:{type:absolute}) {
            processedHtml
          }
        }
        part {
          descriptor
          configAsJson
        }
        image {
          caption
          image {
            imageUrl (type:absolute, scale: "width-768")
          }
        }
`

// THIS QUERY DOES NOT SUPPORT NESTED FRAGMENTS
export const PAGE_FRAGMENT = `
      components(resolveFragment: false, resolveTemplate: true) {
        fragment {
          id
          fragment {
            components {
              ${COMPONENTS_QUERY}
            }
          }
        }
        ${COMPONENTS_QUERY}
      }`;

export function getMetaQuery(pageFragment?: string): string {
    return `query($path:ID!){
              guillotine {
                get(key:$path) {
                  type
                  ${pageFragment || ''}
                }
              }
            }`;
}

export interface PageComponent {
    type: XP_COMPONENT_TYPE;
    path: string;
    part?: PartData;
    layout?: LayoutData;
    fragment?: FragmentData;
    text?: any;
    image?: any;
    regions?: RegionTree;
    data?: any;
}

export interface RegionTree {
    [key: string]: PageRegion;
}

export interface PageRegion {
    name: string;
    components: PageComponent[];
}

export interface PartData {
    descriptor: string;

    [customKeysFromQuery: string]: any;
}

export interface LayoutData {
    descriptor: string;

    [customKeysFromQuery: string]: any;
}

export interface PageData {
    regions?: RegionTree;
}

export interface FragmentData {
    fragment: {
        components: PageComponent[];
    }
}

export interface MetaData {
    type: string,
    path: string,
    requestType: XP_REQUEST_TYPE,
    renderMode: XP_RENDER_MODE,
    requestedComponent?: PageComponent,
    canRender?: boolean,
}
