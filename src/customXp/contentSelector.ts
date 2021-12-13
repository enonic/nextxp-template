import getList, {getListVariables, LIST_CONTENTTYPE_NAME, processListPropsExample} from "./contentTypes/list/getList";
import ListView from "./contentTypes/list/List";

import getMovie, {MOVIE_CONTENTTYPE_NAME} from "./contentTypes/movie/getMovie";
import MovieView from "./contentTypes/movie/Movie";
import {TypesRegistry} from '../xpAdapter/TypesRegistry';


TypesRegistry.addContent(LIST_CONTENTTYPE_NAME, {
    query: {query: getList, variables: getListVariables},         // or just:     query: [ getList, getListVariables ]
    props: processListPropsExample,
    view: ListView,
});
/*
TypesRegistry.addContent(PERSON_CONTENTTYPE_NAME, {
    query: getPerson,
    view: PersonView,
});
*/

TypesRegistry.addContent(MOVIE_CONTENTTYPE_NAME, {
    query: getMovie,
    view: MovieView,
});
