import {Context} from "../pages/[[...contentPath]]";

// APP_NAME helps to fully qualify content type strings in the connected XP app:
import {APP_NAME} from "../enonic-connection-config";


import getList, {getListVariables} from "./queries/getList";
import processList from "./props/processList";
import ListView from "../components/pagetypes/List";

import getPerson from "./queries/getPerson";
import processPerson from "./props/processPerson";
import PersonView from "../components/pagetypes/Person";

import getMovie from "./queries/getMovie";
import processMovie from "./props/processMovie";
import MovieView from "../components/pagetypes/Movie";

////////////////////////////////////////////////////////////////////////  Types:

export type PropsProcessor = (content: any, context?: Context) => any

export type VariablesGetter = (path: string, context?: Context) => {
    path: string,
    [variables: string]: any
};

export type ReactView = (props: any) => JSX.Element

export type SelectedQueryMaybeVariablesFunc = string |
    { query: string, variables: VariablesGetter } |
    [string, VariablesGetter]


/**
 *  Object that configures the handling of a particular content type. All attributes are optional (see examples below), and missing values will fall back to default behavior:
 *          - 'query' (used in fetchContent.ts) Guillotine query for fetching content data, may also have a function that supplies guillotine variables. So, 'query' can EITHER be only a query string, OR also add a get-guillotine-variables function. In the latter case, 'query' can be an object with 'query' and 'variables' attributes, or an array where the query string is first and the get-variables function is second. Either way, the get-variables function takes two arguments: path (content path, mandatory) and context (next.js-supplied Context from getServerSideProps etc. Optional, and requires that fetchContent is called with the context, of course).
 *          - 'props' (used in fetchContent.ts) is a function for processing props: converting directly-from-guillotine props to props adapted for displaying the selected view component
 *          - 'view' (used in BasePage.tsx) is a react component: top-level content-type-specific rendering with the props first fetched from guillotine (and then optionally preprocessed with the function in 'props').
 */
export type ContentSelection = {
    query?: SelectedQueryMaybeVariablesFunc,
    props?: PropsProcessor,
    view?: ReactView
}

/**
 *  Object where keys are full XP content type strings (eg. 'my.app:content-type') and values are (optional) type-specific 'ContentSelection' objects: sets of config for how to handle that content type. All attributes in each 'ContentSelection' object are optional (see examples below), and missing values will fall back to default behavior:
 *          - 'query' (used in fetchContent.ts) Guillotine query for fetching content data, may also have a function that supplies guillotine variables. So, 'query' can EITHER be only a query string, OR also add a get-guillotine-variables function. In the latter case, 'query' can be an object (with 'query' and 'variables' attributes in it), or an array where the query string is first and the get-variables function is second. Either way, the get-variables function takes two arguments: path (content path, mandatory) and context (next.js-supplied Context from getServerSideProps etc. Optional, and requires that fetchContent is called with the context, of course).
 *          - 'props' (used in fetchContent.ts) A function for processing props: converting directly-from-guillotine props to props adapted for displaying the selected view component
 *          - 'view' (used in BasePage.tsx) is a react component: top-level content-type-specific rendering with the props first fetched from guillotine (and then optionally preprocessed with the function in 'props').
 */
export type ContentSelector = {
    [fullContentType: string]: ContentSelection
}


/////////////////////////////////////////////////////////////////////////  TypeSelector:

const typeSelector: ContentSelector = {
/*

    'base:folder': {
        query: [getList, getListVariables],
        props: processList,
        //view: ListView,
    },
*/

    [`${APP_NAME}:person`]: {
        query: getPerson,
        props: processPerson,
        view: PersonView,
    },

    [`${APP_NAME}:movie`]: {
        query: getMovie,
        props: processMovie,
        view: MovieView,
    }
};

export default typeSelector;
