import {APP_NAME} from '../cmsAdapter/constants'
import {CATCH_ALL, TypesRegistry} from '../cmsAdapter/TypesRegistry';

import {ContentDevView} from '../cmsAdapter/views/_BaseContent';

import getPerson from './contentTypes/person/getPerson';
import Person from './contentTypes/person/Person';
import MainPageView from './pages/Main';

import ThreeColumnLayoutView from './layouts/ThreeColumnLayout';
import FocusLayoutView from './layouts/FocusLayout';

import ChildList, {ChildListQuery, childListProcessor} from './parts/ChildList';
import MovieDetails from './parts/movie/MovieDetails';
import getMovie from './parts/movie/getMovie';
import Heading from './parts/Heading';

// Content Types

TypesRegistry.addContentType(`${APP_NAME}:person`, {
    query: getPerson,
    view: Person
});

/*
// TODO: Move to defaultMappings, change so CTY CATCH_ALL is executed after custom pages.
TypesRegistry.addContentType(CATCH_ALL, {
    view: ContentDevView,
});
*/

// Pages
TypesRegistry.addPage(`${APP_NAME}:default`, {
    view: MainPageView
});


// Parts
TypesRegistry.addPart(`${APP_NAME}:movie-details`, {
    query: getMovie,
    view: MovieDetails
});
TypesRegistry.addPart(`${APP_NAME}:heading`, {
    view: Heading
});
TypesRegistry.addPart(`${APP_NAME}:child-list`, {
    query: ChildListQuery,
    props: childListProcessor,
    view: ChildList
});



// Layouts
TypesRegistry.addLayout(`${APP_NAME}:3-column`, {
    view: ThreeColumnLayoutView
});

/*
TypesRegistry.addLayout(`${APP_NAME}:focus`, {
    view: FocusLayoutView
});
*/

console.info('CMS components registered');
