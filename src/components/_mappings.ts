import {APP_NAME} from '../_enonicAdapter/constants'
import {TypesRegistry, CATCH_ALL} from '../_enonicAdapter/TypesRegistry';
import Person, {getPerson} from './content/Person';
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

// Page mappings
TypesRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage
});

/*
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
*/
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
