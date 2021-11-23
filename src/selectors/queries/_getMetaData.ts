const RICH_META_QUERY = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      _id
      _path
      displayName
      type
    }
  }
}`;

type RichMeta = {
    _id: string,
    _path: string,
    displayName: string,
    type: string
};



const LEAN_META_QUERY = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      type
    }
  }
}`;

type LeanMeta = {
    type: string
};



export default LEAN_META_QUERY;
export type Meta = LeanMeta;
