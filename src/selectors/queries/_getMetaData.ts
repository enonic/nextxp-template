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
            imageUrl (scale: "width-768")
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
    type: string;
    path: string;
}
export type Meta = {
    type: string,
    components?: PageComponent[],
};
