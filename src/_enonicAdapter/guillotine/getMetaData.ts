import {RENDER_MODE, XP_COMPONENT_TYPE, XP_REQUEST_TYPE} from "../utils";
import {ComponentRegistry} from '../ComponentRegistry';

function sanitizeName(name: string): string {
    const idx = name.indexOf(':');
    return idx >= 0 ? name.substring(idx + 1) : name;
}

export const macroConfigsQuery = (): string => {
    return `config {
        ${ComponentRegistry.getMacros().map(entry => `${sanitizeName(entry[0])}${entry[1].query}`).join('\n')}
    }`
}


export const richTextQuery = (fieldName: string) => {
    return `${fieldName}(processHtml:{type:absolute, imageWidths:[400, 800, 1200], imageSizes:"(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"}) {
                processedHtml
                macros {
                    ref
                    name
                    descriptor
                    ${macroConfigsQuery()}
                }
                links {
                    ref
                    media {
                        content {
                            _id
                        }
                    }
                }
            }`
}

const componentsQuery = () => `
        type
        path
        page {
          descriptor
          configAsJson
          template {
            _path
          }
        }
        layout {
          descriptor
          configAsJson
        }
        text {
            ${richTextQuery('value')}
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
export const pageFragmentQuery = () => `
      components(resolveFragment: false, resolveTemplate: true) {
        fragment {
          id
          fragment {
            components {
              ${componentsQuery()}
            }
          }
        }
        ${componentsQuery()}
      }`;

export function getMetaQuery(pageFragment?: string): string {
    return `query($path:ID!){
              guillotine {
                get(key:$path) {
                  _path
                  type
                  ${pageFragment || ''}
                }
              }
            }`;
}

export interface PageComponent {
    [key: string]: any; // keeps ts happy when accessing component data field by XP_COMPONENT_TYPE type
    type: XP_COMPONENT_TYPE;
    path: string;
    page?: PageData;
    part?: PartData;
    layout?: LayoutData;
    fragment?: FragmentData;
    text?: TextData;
    image?: any;
    regions?: RegionTree;
    data?: any;
    error?: any;
}

export interface TextData {
    value: RichTextData;
}

export interface RichTextData {
    processedHtml: string,
    links: LinkData[],
    macros: MacroData[],
}

export interface LinkData {
    ref: string,
    media: {
        content: {
            id: string,
        }
    } | null,
}

export interface MacroData {
    ref: string;
    name: string;
    descriptor: string;
    config: {
        [name: string]: MacroConfig;
    };
}

export interface MacroConfig {
    [key: string]: any;
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
    config: any;

    [customKeysFromQuery: string]: any;
}

export interface LayoutData {
    descriptor: string;
    config?: any;

    [customKeysFromQuery: string]: any;
}

export interface PageData {
    descriptor: string;
    config?: any;
    template?: string | null;
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
    renderMode: RENDER_MODE,
    requestedComponent?: PageComponent,
    canRender: boolean,
    catchAll: boolean,
}
