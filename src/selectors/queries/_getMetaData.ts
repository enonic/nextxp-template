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
    type: string;
    path: string;
}
export type Meta = {
    type: string,
    components?: PageComponent[],
};
