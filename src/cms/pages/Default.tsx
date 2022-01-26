import React from "react"
import {APP_NAME} from '../../enonicAdapter/enonic-connection-config';
import {PageProps} from './_Page';
import RegionsView from '../../enonicAdapter/views/_Region';

export const DEFAULT_PAGE_NAME = `${APP_NAME}:default`;

const DefaultPageView = (props: PageProps) => {
    const page = props.page;
    if (!page.regions || !Object.keys(page.regions).length) {
        page.regions = {
            main: {
                name: 'main',
                components: [],
            }
        }
    }
    return (
        <>
            <RegionsView {...props} name="main"/>
        </>
    );
};

export default DefaultPageView;
