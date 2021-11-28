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
                  ${isEditMode ? 'pageAsJson' : ''}
                  ${pageFragment || ''}
                }
              }
            }`;
}

export interface PageComponent {
    type: 'part'|'text'|'image';
    path: string;
    part?: PartData,
    text?: any,
    image?: any,
}

export type PartData = {
    descriptor?: string,
    [customKeysFromQuery:string]: any
}

export type Meta = {
    type: string,
    pageAsJson?: {}
    components?: PageComponent[],
};
