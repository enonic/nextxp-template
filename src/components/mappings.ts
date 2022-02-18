import {APP_NAME} from '../cmsAdapter/constants'
import {TypesRegistry} from '../cmsAdapter/TypesRegistry';
import Person, {getPerson} from './contentTypes/Person';
import MainPage from './pages/Main';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import ChildList, {childListProcessor, getChildList} from './parts/ChildList';
import MovieDetails, {getMovie} from './parts/MovieDetails';
import Heading from './parts/Heading';


// Content Type mappings

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
