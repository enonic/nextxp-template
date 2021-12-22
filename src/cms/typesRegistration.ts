import getList, {getListVariables, LIST_CONTENTTYPE_NAME, processListPropsExample} from "./contentTypes/list/getList";
import ListView from "./contentTypes/list/List";

import getMovie, {MOVIE_CONTENTTYPE_NAME} from "./contentTypes/movie/getMovie";
import MovieView from "./contentTypes/movie/Movie";
import {CATCH_ALL_NAME, TypesRegistry} from '../xpAdapter/TypesRegistry';
import {XP_COMPONENT_TYPE} from '../xpAdapter/enonic-connection-config';
import BasePart from '../xpAdapter/views/_BasePart';
import BaseLayout from '../xpAdapter/views/_BaseLayout';
import ImageView from './components/_Image';
import TextView from './components/_Text';
import PersonList, {PERSONLIST_PART_NAME, PERSONLIST_QUERY, personListProcessor} from './parts/PersonList';
import ThreeColumnLayoutView, {THREE_COL_LAYOUT_NAME} from './layouts/ThreeColumnLayout';
import CenteredLayoutView, {CENTERED_LAYOUT_NAME} from './layouts/CenteredLayout';
import DefaultLayoutView from './layouts/_Layout';
import PersonInfo, {PERSONINFO_PART_NAME, personInfoProcessor} from './parts/PersonInfo';
import DefaultPartView from './parts/_Part';
import FragmentView, {FRAGMENT_CONTENTTYPE_NAME} from '../xpAdapter/views/_Fragment';


/*
*       Content Types
* */

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

TypesRegistry.addContentType(FRAGMENT_CONTENTTYPE_NAME, {
    view: FragmentView,
});

/*
*       Component Types
* */

TypesRegistry.addComponent(XP_COMPONENT_TYPE.PART, {
    // query: TODO: allow override queries (which would affect all image components) to be added here? If so, should they mutate the first (meta) or the second one?
    // props: TODO: same,
    view: BasePart
});

TypesRegistry.addComponent(XP_COMPONENT_TYPE.LAYOUT, {
    view: BaseLayout
});

TypesRegistry.addComponent(XP_COMPONENT_TYPE.FRAGMENT, {
    view: FragmentView
});

TypesRegistry.addComponent(XP_COMPONENT_TYPE.IMAGE, {
    view: ImageView
});

TypesRegistry.addComponent(XP_COMPONENT_TYPE.TEXT, {
    view: TextView
});


/*
*       Part Types
* */

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
* */

TypesRegistry.addLayout(THREE_COL_LAYOUT_NAME, {
    view: ThreeColumnLayoutView
});

TypesRegistry.addLayout(CENTERED_LAYOUT_NAME, {
    view: CenteredLayoutView
});

TypesRegistry.addLayout(CATCH_ALL_NAME, {
    view: DefaultLayoutView
});
