import React from "react"
import {ComponentRegistry} from '../ComponentRegistry';
import {MetaData, PageData} from "../guillotine/getMetaData";
import {IS_DEV_MODE} from "../utils";
import DataDump from "./DataDump";
import Empty from './Empty';

export interface PageProps {
    page: PageData;
    data?: any;
    common?: any; // Content is passed down to componentviews. TODO: Use a react contextprovider instead?
    meta: MetaData;
}

export interface BasePageProps {
    component?: PageData;
    common?: any;
    data?: any;
    error?: string;
    meta: MetaData;
}

const PageView = ({page}: PageProps) => {
    return (
        <div className={`page`}
             style={{margin: "10px", padding: "10px", border: "2px solid lightgrey"}}>
            <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>Page debug:</h6>
            <h3 style={{marginTop: "0", marginBottom: "8px"}}>{page.descriptor}</h3>
            <DataDump label="config" data={page.config}/>
            <DataDump label="regions" data={page.regions}/>
        </div>);
}

export const PageDevView = IS_DEV_MODE
                           ? PageView
                           : Empty; // TODO: Should return 404 + log error about missing component mapping


const BasePage = (props: BasePageProps) => {
    const {component, data, common, error, meta} = props;
    const desc = component?.descriptor;
    if (error) {
        console.warn(`BasePage: '${desc}' error: ${error}`);
        return null;    //TODO: create page error view
    }
    let pageDef;
    if (desc) {
        pageDef = ComponentRegistry.getPage(desc);
    }
    const PageView = pageDef?.view;
    if (PageView) {
        return <PageView page={component}
                         data={data}
                         common={common}
                         meta={meta}/>;
    } else if (component?.descriptor) {
        // empty descriptor usually means uninitialized page
        console.warn(`BasePage: can not render page '${desc}': no next view or catch-all defined`);
    }
    return null;
}

export default BasePage;
