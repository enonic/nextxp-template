import {XP_COMPONENT_TYPE} from "../../xpAdapter/enonic-connection-config";

export const PAGE_FRAGMENT = `
      components {
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
          value {
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
      }`;

export function getMetaQuery(isEditMode: boolean, pageFragment?: string): string {
    return `query($path:ID!){
              guillotine {
                get(key:$path) {
                  type
                  pageAsJson
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
    fragment?: any;
    text?: any;
    image?: any;
    regions?: RegionTree;
}

export interface RegionTree {
    [key: string]: PageRegion;
}

export interface PageRegion {
    name: string;
    components: PageComponent[];
}

export type PartData = {
    descriptor: string,
    [customKeysFromQuery: string]: any
}

export interface LayoutData {
    descriptor: string,

    [customKeysFromQuery: string]: any
}

export interface Meta {
    type: string,
    pageAsJson?: {}
    components?: PageComponent[],
};
