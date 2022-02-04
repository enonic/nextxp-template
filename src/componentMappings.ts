import {APP_NAME} from './cmsAdapter/constants'
import {CATCH_ALL, TypesRegistry} from './cmsAdapter/TypesRegistry';

import DefaultView from './components/defaultView';

import PersonQuery from './components/contentTypes/person/PersonQuery';
import Person from './components/contentTypes/person/Person';
import MainPageView from './components/pages/Main';

import ThreeColumnLayoutView from './components/layouts/ThreeColumnLayout';
import CenteredLayoutView from './components/layouts/BoostLayout';
import FallbackLayoutView from './components/parts/_Part';

import PersonList, {PersonListQuery, personListProcessor} from './components/parts/person/PersonList';
import PersonInfo, {personInfoProcessor} from './components/parts/person/PersonInfo';
import Movie from './components/parts/movie/Movie';
import FallbackPartView from './components/parts/_Part';

// Content Types
/*
TypesRegistry.addContentType(CATCH_ALL, {
    view: DefaultView,
});
*/ 
TypesRegistry.addContentType(`${APP_NAME}:person`, {
    query: PersonQuery,
    view: Person
});


// Pages
TypesRegistry.addPage(`${APP_NAME}:default`, {
    view: MainPageView
});


// Parts
TypesRegistry.addPart(`${APP_NAME}:personList`, {
    query: PersonListQuery,
    props: personListProcessor,
    view: PersonList,
});
TypesRegistry.addPart(`${APP_NAME}:personInfo`, {
    props: personInfoProcessor,
    view: PersonInfo,
});
TypesRegistry.addPart(CATCH_ALL, {
    view: FallbackPartView
});


// Layouts
TypesRegistry.addLayout(`${APP_NAME}:3-column`, {
    view: ThreeColumnLayoutView
});

TypesRegistry.addLayout(`${APP_NAME}:layout-centered`, {
    view: CenteredLayoutView
});

TypesRegistry.addLayout(CATCH_ALL, {
    view: FallbackPartView
});

console.info('CMS components registered');
