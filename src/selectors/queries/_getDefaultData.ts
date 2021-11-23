// Catch-all default cet-content-data query (second call for a content item of known content type).
// THIS SCALES BADLY and is not supposed to be used in production!
//
// Data calls, including added overrides, should always return type for verification and cache invalidation.

export const LOW_PERFORMING_DEFAULT_QUERY = `
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
