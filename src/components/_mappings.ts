import {APP_NAME} from '../_enonicAdapter/utils'
import {ComponentRegistry} from '../_enonicAdapter/ComponentRegistry';
import Person from './views/Person';
import getPerson from './queries/getPerson';
import MainPage from './pages/Main';
import ChildList, {childListProcessor, getChildList} from './parts/ChildList';
import Heading from './parts/Heading';
import MovieDetails, {getMovie} from './parts/MovieDetails';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import getMainPage from './queries/getMainPage';
import getTwoColumnLayout from './queries/getTwoColumnLayout';
import {commonQuery, commonVariables} from './commonQuery';


// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables]);


// Content type mappings
ComponentRegistry.addContentType(`${APP_NAME}:person`, {
    query: getPerson,
    view: Person
});

// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage,
    query: getMainPage,
});


// Layout mappings
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
    view: TwoColumnLayout,
    query: getTwoColumnLayout,
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


// console.debug('CMS components registered');
