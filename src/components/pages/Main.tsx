import React from "react"
import { PageProps } from "../../cmsAdapter/views/_BasePage";
import RegionsView from '../../cmsAdapter/views/_Region';

const MainPage = (props: PageProps) => {
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

export default MainPage;