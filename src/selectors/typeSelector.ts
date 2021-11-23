import {Context} from "../pages/[[...contentPath]]";

// APP_NAME helps to fully qualify content type strings in the connected XP app:
import {APP_NAME} from "../enonic-connection-config";

////////////////////////////////////////////////////////////////////////  Types:

export type PropsProcessor = (content: any, context?: Context) => any

export type VariablesGetter = (path: string, context?: Context) => {
    path: string,
    [variables: string]: any
};

export type PageComponent = (content:any) => JSX.Element

export type SelectedQueryMaybeVariablesFunc = string |
    { query:string, variables:VariablesGetter } |
    [ string, VariablesGetter ]


/**
 *  Object that configures the handling of a particular content type. All attributes are optional (see examples below), and missing values will fall back to default behavior:
 *          - 'query' (used in fetchContent.ts) Guillotine query for fetching content data, may also have a function that supplies guillotine variables. So, 'query' can EITHER be only a query string, OR also add a get-guillotine-variables function. In the latter case, 'query' can be an object with 'query' and 'variables' attributes, or an array where the query string is first and the get-variables function is second. Either way, the get-variables function takes two arguments: path (content path, mandatory) and context (next.js-supplied Context from getServerSideProps etc. Optional, and requires that fetchContent is called with the context, of course).
 *          - 'props' (used in fetchContent.ts) is a function for processing props: converting directly-from-guillotine props to props adapted for displaying the selected page component
 *          - 'page' (used in BasePage.tsx) is a react component: top-level content-type-specific rendering with the props first fetched from guillotine (and then optionally preprocessed with the function in 'props').
 */
export type TypeSelection = {
    query?: SelectedQueryMaybeVariablesFunc,
    props?: PropsProcessor,
    page?: PageComponent

}

/**
 *  Object where keys are full XP content type strings (eg. 'my.app:content-type') and values are (optional) type-specific 'TypeSelection' objects: sets of config for how to handle that content type. All attributes in each 'TypeSelection' object are optional (see examples below), and missing values will fall back to default behavior:
 *          - 'query' (used in fetchContent.ts) Guillotine query for fetching content data, may also have a function that supplies guillotine variables. So, 'query' can EITHER be only a query string, OR also add a get-guillotine-variables function. In the latter case, 'query' can be an object (with 'query' and 'variables' attributes in it), or an array where the query string is first and the get-variables function is second. Either way, the get-variables function takes two arguments: path (content path, mandatory) and context (next.js-supplied Context from getServerSideProps etc. Optional, and requires that fetchContent is called with the context, of course).
 *          - 'props' (used in fetchContent.ts) A function for processing props: converting directly-from-guillotine props to props adapted for displaying the selected page component
 *          - 'page' (used in BasePage.tsx) is a react component: top-level content-type-specific rendering with the props first fetched from guillotine (and then optionally preprocessed with the function in 'props').
 */
export type TypeSelector = {
    [fullContentType:string]: TypeSelection
}


/////////////////////////////////////////////////////////////////////////  TypeSelector:

const typeSelector: TypeSelector = {


    /* EXAMPLES:

    'base:folder': {
        query: 'Guillotine query string specialized in fetching data for XP folder items'
    },

    'my.app:my-content-type': {
        query: {
            query: 'Guillotine query for my-content-type in my.app',
            variables: (xpContentPath, contextFromNext) => guillotineVariables
        }
        page: PageReactComponentForDisplayingThisContentTypeWithRawGuillotineProps
    },

    [`${APP_NAME}:anotherContentType`]: {
        query: [ 'anotherContentType query, app name imported from .env', getVariablesFunction ],
        props: (rawPropsFromGuillotine, contextFromNext) => processedPropsReadyForPageComponent,
        page: PageReactComponentForProcessedProps
    },

    // ...ETC
    */
};


export default typeSelector;
