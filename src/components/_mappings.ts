import {APP_NAME} from '../_enonicAdapter/utils'
import {ComponentRegistry} from '../_enonicAdapter/ComponentRegistry';
import Person from './views/Person';
import getPerson from './queries/getPerson';
import MainPage from './pages/Main';
import ChildList, {childListProcessor, getChildList} from './parts/ChildList';
import Heading from './parts/Heading';
import MovieDetails, {getMovie} from './parts/MovieDetails';
import TwoColumnLayout from './layouts/TwoColumnLayout';


// Content type mappings


ComponentRegistry.addContentType(`${APP_NAME}:person`, {
    query: getPerson,
    view: Person
});

// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage
});


// Layout mappings
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
    view: TwoColumnLayout
});


// Part mappings
ComponentRegistry.addPart(`${APP_NAME}:movie-details`, {
    query: getMovie,
    view: MovieDetails
});
ComponentRegistry.addPart(`${APP_NAME}:heading`, {
    view: Heading
});

ComponentRegistry.addPart(`${APP_NAME}:child-list`, {
    query: getChildList,
    processor: childListProcessor,
    view: ChildList
});


/*
ComponentRegistry.addLayout(`${APP_NAME}:focus`, {
    view: FocusLayoutView
});
*/


console.info('CMS components registered');
