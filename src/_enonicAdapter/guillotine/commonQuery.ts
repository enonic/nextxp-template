// This query is executed for every page rendering.
// Result is included in props.content by fetchContent

export const commonQuery = `
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

export function commonVariables(path: string) {
    return {
        path
    }
}
