import {APP_NAME} from '../cmsAdapter/constants'
import {CATCH_ALL, TypesRegistry} from '../cmsAdapter/TypesRegistry';

import DebugView from './_DebugView';

import getPerson from './contentTypes/person/getPerson';
import Person from './contentTypes/person/Person';
import MainPageView from './pages/Main';

import ThreeColumnLayoutView from './layouts/ThreeColumnLayout';
import FocusLayoutView from './layouts/FocusLayout';
import LayoutDebugView from './parts/_Part';

import PersonList, {PersonListQuery, personListProcessor} from './parts/person/PersonList';
import MovieDetails from './parts/movie/MovieDetails';
import getMovie from './parts/movie/getMovie';
import Heading from './parts/Heading';
import PartDebugView from './parts/_Part';

// Content Types
/*
TypesRegistry.addContentType(CATCH_ALL, {
    view: DebugView,
});
*/ 
TypesRegistry.addContentType(`${APP_NAME}:person`, {
    query: getPerson,
    view: Person
});


// Pages
TypesRegistry.addPage(`${APP_NAME}:default`, {
    view: MainPageView
});


// Parts
TypesRegistry.addPart(`${APP_NAME}:person-list`, {
    query: PersonListQuery,
    props: personListProcessor,
    view: PersonList
});
TypesRegistry.addPart(`${APP_NAME}:movie-details`, {
    query: getMovie,
    view: MovieDetails
});
TypesRegistry.addPart(`${APP_NAME}:heading`, {
    view: Heading
});
TypesRegistry.addPart(CATCH_ALL, {
    view: PartDebugView
});


// Layouts
TypesRegistry.addLayout(`${APP_NAME}:3-column`, {
    view: ThreeColumnLayoutView
});

TypesRegistry.addLayout(`${APP_NAME}:layout-centered`, {
    view: FocusLayoutView
});

TypesRegistry.addLayout(CATCH_ALL, {
    view: LayoutDebugView
});

console.info('CMS components registered');
