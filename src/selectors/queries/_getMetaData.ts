export const PAGE_FRAGMENT = ` 
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
