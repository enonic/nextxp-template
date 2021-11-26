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
      }
    pageAsJson(resolveTemplate: true)
    pageTemplate {
        _path
        pageAsJson(resolveTemplate: true)
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

export type Meta = {
    type: string,
    pageAsJson?: Object,
    pageTemplate?: {
        _path: string,
        pageAsJson: Object,
    }
};
