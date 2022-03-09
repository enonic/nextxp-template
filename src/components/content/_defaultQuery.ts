// This query is executed for every page rendering.
// Result is included in props.content by fetchContent

export const defaultQuery = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      type
      _id
      displayName
      data: dataAsJson
      x: xAsJson
    }
  }
}`;

export function defaultVariables(path: string) {
    return {
        path
    }
}
