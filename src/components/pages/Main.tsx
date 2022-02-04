import React from "react"
import {APP_NAME} from '../../cmsAdapter/connection-config';
import {PageProps} from './_Page';
import RegionsView from '../../cmsAdapter/views/_Region';

export const DEFAULT_PAGE_NAME = `${APP_NAME}:default`;

const MainPageView = (props: PageProps) => {
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

export default MainPageView;
