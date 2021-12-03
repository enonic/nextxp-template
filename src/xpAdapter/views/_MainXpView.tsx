import React from 'react';

import Custom500 from '../../components/errors/500';
import Custom404 from '../../components/errors/404';
import CustomError from '../../components/errors/Error';

import {FetchContentResult} from "../guillotine/fetchContent";
import SingleComponent from "./_SingleComponent";
import BaseContent from "./_BaseContent";


const errorPageSelector = {
    '404': Custom404,
    '500': Custom500
}



const _MainXpView = (props: FetchContentResult) => {
    const { meta, error} = props;
    if (error) {
        // @ts-ignore
        const ErrorPage = errorPageSelector[error.code] || CustomError;
        return <ErrorPage {...error}/>;
    }

    // Single-component render:
    if (meta.xpRequestType === "component") {
        return <SingleComponent {...props} />
    }

    // meta.xpRequestType="type", and hence content-type based, is standard view for now.
    return <BaseContent {...props} />
};

export default _MainXpView;
