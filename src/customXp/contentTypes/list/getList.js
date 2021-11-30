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

// fully qualified XP content-type name:
export const LIST_CONTENTTYPE_NAME = `base:folder`;
