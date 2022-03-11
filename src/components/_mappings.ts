import {APP_NAME} from '../_enonicAdapter/utils'
import {TypesRegistry} from '../_enonicAdapter/ComponentRegistry';
import Person from './views/Person';
import getPerson from './queries/getPerson';
import MainPage from './pages/Main';
import ChildList, {childListProcessor, getChildList} from './parts/ChildList';
import Heading from './parts/Heading';
import MovieDetails, {getMovie} from './parts/MovieDetails';
import TwoColumnLayout from './layouts/TwoColumnLayout';


// Content type mappings

TypesRegistry.addContentType(`${APP_NAME}:person`, {
    query: getPerson,
    view: Person
});

// Page mappings
TypesRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage
});


// Layout mappings
TypesRegistry.addLayout(`${APP_NAME}:2-column`, {
    view: TwoColumnLayout
});


// Part mappings
TypesRegistry.addPart(`${APP_NAME}:movie-details`, {
    query: getMovie,
    view: MovieDetails
});
TypesRegistry.addPart(`${APP_NAME}:heading`, {
    view: Heading
});

TypesRegistry.addPart(`${APP_NAME}:child-list`, {
    query: getChildList,
    processor: childListProcessor,
    view: ChildList
});


/*
TypesRegistry.addLayout(`${APP_NAME}:focus`, {
    view: FocusLayoutView
});
*/


console.info('CMS components registered');
