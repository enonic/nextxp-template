import React from "react"
import {TypesRegistry} from '../TypesRegistry';
import {FetchContentResult} from '../guillotine/fetchContent';
import {MetaData, PageData} from "../../cmsAdapter/guillotine/_getMetaData";

export interface PageProps {
    page: PageData;
    content: any;
    meta: MetaData;
}

const BasePage = (props: FetchContentResult) => {
    const desc = props.page?.descriptor;
    let pageDef;
    if (desc) {
        pageDef = TypesRegistry.getPage(desc);
    }
    const PageView = pageDef?.view;
    if (PageView) {
        return <PageView {...props}/>;
    } else {
        console.log(`BasePage: can not render page '${desc}': no next view or catch-all defined`);
        return null;
    }
}

export default BasePage;
