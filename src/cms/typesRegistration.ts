import getList, {getListVariables, LIST_CONTENTTYPE_NAME, processListPropsExample} from "./contentTypes/list/getList";
import ListView from "./contentTypes/list/List";

import getMovie, {MOVIE_CONTENTTYPE_NAME} from "./contentTypes/movie/getMovie";
import MovieView from "./contentTypes/movie/Movie";
import {CATCH_ALL_NAME, TypesRegistry} from '../enonicAdapter/TypesRegistry';
import PersonList, {PERSONLIST_PART_NAME, PERSONLIST_QUERY, personListProcessor} from './parts/PersonList';
import ThreeColumnLayoutView, {THREE_COL_LAYOUT_NAME} from './layouts/ThreeColumnLayout';
import CenteredLayoutView, {CENTERED_LAYOUT_NAME} from './layouts/CenteredLayout';
import DefaultLayoutView from './layouts/_Layout';
import PersonInfo, {PERSONINFO_PART_NAME, personInfoProcessor} from './parts/PersonInfo';
import DefaultPartView from './parts/_Part';
import DefaultView from './contentTypes/_DefaultView';
import {SITE_CONTENTTYPE_NAME} from '../enonicAdapter/enonic-connection-config';
import DefaultPageView from './pages/_Page';
import DefaultPageViewImpl, {DEFAULT_PAGE_NAME} from './pages/Default';


// Do the required enonic types registration
//TODO: move it somewhere safe
import "../enonicAdapter/enonicTypesRegistration";

/*
*       Content Types
*/
//TODO: default site view
TypesRegistry.addContentType(SITE_CONTENTTYPE_NAME, {
    view: DefaultView,
});

//TODO: move to comps files

TypesRegistry.addContentType(LIST_CONTENTTYPE_NAME, {
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

TypesRegistry.addContentType(MOVIE_CONTENTTYPE_NAME, {
    query: getMovie,
    view: MovieView,
});

/*
*       Page Types
*/
TypesRegistry.addPage(DEFAULT_PAGE_NAME, {
    view: DefaultPageViewImpl
});


TypesRegistry.addPage(CATCH_ALL_NAME, {
    view: DefaultPageView
});


/*
*       Part Types
*/

TypesRegistry.addPart(PERSONLIST_PART_NAME, {
    query: PERSONLIST_QUERY,
    props: personListProcessor,
    view: PersonList,
});

TypesRegistry.addPart(PERSONINFO_PART_NAME, {
    props: personInfoProcessor,
    view: PersonInfo,
});

TypesRegistry.addPart(CATCH_ALL_NAME, {
    view: DefaultPartView
});

/*
*       Layout Types
*/

TypesRegistry.addLayout(THREE_COL_LAYOUT_NAME, {
    view: ThreeColumnLayoutView
});

TypesRegistry.addLayout(CENTERED_LAYOUT_NAME, {
    view: CenteredLayoutView
});

TypesRegistry.addLayout(CATCH_ALL_NAME, {
    view: DefaultLayoutView
});

console.info('Registered cms components.');
