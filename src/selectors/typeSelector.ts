import {Context} from "../pages/[[...contentPath]]";

// APP_NAME helps to fully qualify content type strings in the connected XP app:
import {APP_NAME} from "../enonic-connection-config";

import getPerson from "./queries/getPerson";
import processPerson from "./props/processPerson";
import PersonPage from "../components/pagetypes/Person";

import getMovie from "./queries/getMovie";
import processMovie from "./props/processMovie";
import MoviePage from "../components/pagetypes/Movie";

////////////////////////////////////////////////////////////////////////  Types:

export type PropsProcessor = (content: any, context?: Context) => any

export type VariablesGetter = (path: string, context?: Context) => {
    path: string,
    [variables: string]: any
};

export type ReactComp = (props: any) => JSX.Element

export type SelectedQueryMaybeVariablesFunc = string |
    { query: string, variables: VariablesGetter } |
    [string, VariablesGetter]


/**
 *  Object that configures the handling of a particular content type. All attributes are optional (see examples below), and missing values will fall back to default behavior:
 *          - 'query' (used in fetchContent.ts) Guillotine query for fetching content data, may also have a function that supplies guillotine variables. So, 'query' can EITHER be only a query string, OR also add a get-guillotine-variables function. In the latter case, 'query' can be an object with 'query' and 'variables' attributes, or an array where the query string is first and the get-variables function is second. Either way, the get-variables function takes two arguments: path (content path, mandatory) and context (next.js-supplied Context from getServerSideProps etc. Optional, and requires that fetchContent is called with the context, of course).
 *          - 'props' (used in fetchContent.ts) is a function for processing props: converting directly-from-guillotine props to props adapted for displaying the selected page component
 *          - 'page' (used in BasePage.tsx) is a react component: top-level content-type-specific rendering with the props first fetched from guillotine (and then optionally preprocessed with the function in 'props').
 */
export type TypeSelection = {
    query?: SelectedQueryMaybeVariablesFunc,
    props?: PropsProcessor,
    page?: ReactComp
}

/**
 *  Object where keys are full XP content type strings (eg. 'my.app:content-type') and values are (optional) type-specific 'TypeSelection' objects: sets of config for how to handle that content type. All attributes in each 'TypeSelection' object are optional (see examples below), and missing values will fall back to default behavior:
 *          - 'query' (used in fetchContent.ts) Guillotine query for fetching content data, may also have a function that supplies guillotine variables. So, 'query' can EITHER be only a query string, OR also add a get-guillotine-variables function. In the latter case, 'query' can be an object (with 'query' and 'variables' attributes in it), or an array where the query string is first and the get-variables function is second. Either way, the get-variables function takes two arguments: path (content path, mandatory) and context (next.js-supplied Context from getServerSideProps etc. Optional, and requires that fetchContent is called with the context, of course).
 *          - 'props' (used in fetchContent.ts) A function for processing props: converting directly-from-guillotine props to props adapted for displaying the selected page component
 *          - 'page' (used in BasePage.tsx) is a react component: top-level content-type-specific rendering with the props first fetched from guillotine (and then optionally preprocessed with the function in 'props').
 */
export type TypeSelector = {
    [fullContentType: string]: TypeSelection
}


/////////////////////////////////////////////////////////////////////////  TypeSelector:

const typeSelector: TypeSelector = {

    /*    'base:folder': {
            query: [getList, getListVariables],
            props: processList,
            page: ListPage,
        },*/

    [`${APP_NAME}:person`]: {
        query: getPerson,
        props: processPerson,
        page: PersonPage,
    },

    [`${APP_NAME}:movie`]: {
        query: getMovie,
        props: processMovie,
        page: MoviePage,
    }
};


export default typeSelector;
