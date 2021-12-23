import React from 'react';

import Custom500 from '../../components/errors/500';
import Custom404 from '../../components/errors/404';
import CustomError from '../../components/errors/Error';

import {FetchContentResult} from "../guillotine/fetchContent";
import SingleComponent from "./_SingleComponent";
import BaseContent from "./_BaseContent";
import {XP_REQUEST_TYPE} from '../enonic-connection-config';


const errorPageSelector: { [key: string]: (props?: any) => JSX.Element } = {
    '404': Custom404,
    '500': Custom500,
}


const _MainView = (props: FetchContentResult) => {
    const {meta, error} = props;
    if (error) {
        const ErrorPage = errorPageSelector[error.code] || CustomError;
        return <ErrorPage {...error}/>;
    }

    // Single-component render:
    if (meta?.requestType === XP_REQUEST_TYPE.COMPONENT) {
        return <SingleComponent {...props} />
    }

    // meta.requestType="type", and hence content-type based, is standard view for now.
    return <BaseContent {...props} />
};

export default _MainView;
