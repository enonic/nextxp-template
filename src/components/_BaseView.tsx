import React from 'react';

import Custom500 from './errors/500';
import Custom404 from './errors/404';
import CustomError from './errors/Error';

import DefaultView from "../components/pagetypes/_Default";
import selector, {ContentSelection} from "../selectors/contentSelector";

import {FetchContentResult} from "../guillotine/fetchContent";
import SingleComponent from "./pageeditor/_SingleComponent";


const errorPageSelector = {
    '404': Custom404,
    '500': Custom500
}



const _BaseView = (props: FetchContentResult) => {
    const {content, meta, page, error} = props;
    if (error) {
        // @ts-ignore
        const ErrorPage = errorPageSelector[error.code] || CustomError;
        return <ErrorPage {...error}/>;
    }

    // Single-component render:
    if (meta.xpRequestType === "component") {
        return <SingleComponent {...props} />
                                                                                                                        /*
                                                                                                                        console.log("--> regions:", JSON.stringify(view?.regions, null, 2));
                                                                                                                        console.log("meta:", JSON.stringify(meta, null, 2));
                                                                                                                        */
    }

    // meta.xpRequestType="type" is standard view for now.
    if (!content) {
        console.warn("No 'content' data in BasePage props");
        return null;
    }

    if (!meta || !meta.type) {
        console.warn("BasePage props are missing 'meta.type'. Falling back to _Default view type.");
    }

    const typeSelection: ContentSelection = (selector || {})[meta.type]
    const SelectedPage = typeSelection?.view || DefaultView;

    // @ts-ignore
    return <SelectedPage content={content} page={page} />;
};

export default _BaseView;
