import {Context} from "../pages/[[...contentPath]]";

// APP_NAME helps to fully qualify content type strings in the connected XP app:
import {APP_NAME} from "../xpAdapter/enonic-connection-config";

import getList, {LIST_CONTENTTYPE_NAME, getListVariables, processListPropsExample } from "./contentTypes/list/getList";
import ListView from "./contentTypes/list/List";

import getPerson, {PERSON_CONTENTTYPE_NAME} from "./contentTypes/person/getPerson";
import PersonView from "./contentTypes/person/Person";

import getMovie, {MOVIE_CONTENTTYPE_NAME} from "./contentTypes/movie/getMovie";
import MovieView from "./contentTypes/movie/Movie";

import {TypeSelection} from "./_selectorTypes";

////////////////////////////////////////////////////////////////////////  Types:




/**
 *  Object where keys are full XP content type strings (eg. 'my.app:content-type') and values are (optional) type-specific 'TypeSelection' objects: sets of config for how to handle that content type. All attributes in each 'TypeSelection' object are optional (see examples below), and missing values will fall back to default behavior:
 *          - 'query' (used in fetchContent.ts) Guillotine query for fetching content data, may also have a function that supplies guillotine variables. So, 'query' can EITHER be only a query string, OR also add a get-guillotine-variables function. In the latter case, 'query' can be an object (with 'query' and 'variables' attributes in it), or an array where the query string is first and the get-variables function is second. Either way, the get-variables function takes two arguments: path (content path, mandatory) and context (next.js-supplied Context from getServerSideProps etc. Optional, and requires that fetchContent is called with the context, of course).
 *          - 'props' (used in fetchContent.ts) A function for processing props: converting directly-from-guillotine props to props adapted for displaying the selected view component
 *          - 'view' (used in BasePage.tsx) is a react component: top-level content-type-specific rendering with the props first fetched from guillotine (and then optionally preprocessed with the function in 'props').
 */
export type ContentSelector = {
    [fullContentType: string]: TypeSelection
}


/////////////////////////////////////////////////////////////////////////  TypeSelector:

const typeSelector: ContentSelector = {

    [LIST_CONTENTTYPE_NAME]: {
        query: { query: getList, variables: getListVariables },         // or just:     query: [ getList, getListVariables ]
        props: processListPropsExample,
        view: ListView,
    },

   [PERSON_CONTENTTYPE_NAME]: {
        query: getPerson,
        view: PersonView,
    },

    [MOVIE_CONTENTTYPE_NAME]: {
        query: getMovie,
        view: MovieView,
    }
};


export default typeSelector;
