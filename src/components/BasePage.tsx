import React from 'react';

import Custom500 from './errors/500';
import Custom404 from './errors/404';
import CustomError from './errors/Error';

import DefaultPage from "../components/pagetypes/_Default";
import selector, {TypeSelection} from "../selectors/typeSelector";

import {ContentResult} from "../guillotine/fetchContent";


const errorPageSelector = {
    '404': Custom404,
    '500': Custom500
}

const BasePage = ({content, meta, page, error}: ContentResult) => {
    if (error) {
        // @ts-ignore
        const ErrorPage = errorPageSelector[error.code] || CustomError;
        return <ErrorPage {...error}/>;
    }

    if (!content) {
        console.warn("No 'content' data in BasePage props");
        return null;
    }

    if (!meta || !meta.type) {
        console.warn("BasePage props are missing 'meta.type'. Falling back to _Default page type.");
    }

    const typeSelection: TypeSelection = (selector || {})[meta.type]
    const SelectedPage = typeSelection?.page || DefaultPage;

    return <SelectedPage {...Object.assign({}, content, page)} />;
};

export default BasePage;
