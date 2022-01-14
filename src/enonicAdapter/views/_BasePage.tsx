import React from "react"
import {TypesRegistry} from '../TypesRegistry';
import {FetchContentResult} from '../guillotine/fetchContent';


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
