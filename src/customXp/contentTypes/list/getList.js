const getListQuery = `
query($path:ID!) {                     
  guillotine {
    get(key:$path) {
      type
      displayName
      children(first:1000) {                 
        displayName
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getListQuery;

