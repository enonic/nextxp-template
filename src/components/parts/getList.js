const getListQuery = `
query($path:ID!, $maxChildren:Int, $start:Int) {                   
  guillotine {
    get(key:$path) {
      type
      displayName
      children(first:$maxChildren, offset:$start) {                 
        displayName
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getListQuery;

// fully qualified XP content-type name:
export const LIST_CONTENTTYPE_NAME = `base:folder`;


// Supplies $maxChildren and $start parameters to variables,
// either with integers from the URI, or default values.
// $path is also returned: it must be or the query will fail.
export const getListVariables = (path, context) => {
    const { max, start } = context.query || {};

    let maxInt = parseInt(max);
    if (isNaN(maxInt)) {
        maxInt = 1000;
    }

    let startInt = parseInt(start);
    if (isNaN(startInt)) {
        startInt = 0;
    }

    return {
        path,
        maxChildren: maxInt,
        start: startInt
    };
} ;


export const processListPropsExample = (props, context) => ({
    ...props,
    children: (props.children || []).map(
        child => ({
            ...child,
            displayName: "Click me: " + child.displayName
        })
    )
});
