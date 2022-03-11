import React from "react"
import {TypesRegistry} from '../ComponentRegistry';
import {FetchContentResult} from '../guillotine/fetchContent';
import {MetaData, PageData} from "../guillotine/getMetaData";
import {IS_DEV_MODE} from "../utils";
import DataDump from "./DataDump";
import Empty from './Empty';

export interface PageProps {
    page: PageData;
    content: any;
    meta: MetaData;
}

const PageView = ({page}: PageProps) => {
    return (
        <div className={`page`}
             style={{margin: "10px", padding: "10px", border: "2px solid lightgrey"}}>
            <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>Page debug:</h6>
            <h3 style={{marginTop: "0", marginBottom: "8px"}}>{page.descriptor}</h3>
            <DataDump label="config" data={page.config} />
            <DataDump label="regions" data={page.regions} />
        </div>);
}

export const PageDevView = IS_DEV_MODE
    ? PageView
    : Empty; // TODO: Should return 404 + log error about missing component mapping


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
