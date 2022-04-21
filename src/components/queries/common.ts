// This query is executed for every page rendering.
// Result is included in props.common

export const commonQuery = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      _id
      type
      dataAsJson
      xAsJson
    }
    getSite {
      displayName
      _path
    }
  }
}`;

export function commonVariables(path: string) {
    return {
        path
    }
}
