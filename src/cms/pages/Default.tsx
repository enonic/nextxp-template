import React from "react"
import {APP_NAME} from '../../enonicAdapter/enonic-connection-config';
import {PageProps} from './_Page';
import RegionsView from '../../enonicAdapter/views/_Region';

export const DEFAULT_PAGE_NAME = `${APP_NAME}:default`;

const DefaultPageView = (props: PageProps) => {
    return (
        <>
            <RegionsView {...props}/>
        </>
    );
};

export default DefaultPageView;
