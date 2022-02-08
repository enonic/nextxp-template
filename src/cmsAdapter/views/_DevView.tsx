import React from "react"
import {IS_DEV_MODE} from "../constants";
import {PartProps} from '../views/_BasePart';
import {LayoutProps} from '../views/_BaseLayout';
import DataDump from "./DataDump";
import Empty from "./Empty";
import { PageProps } from "../views/_BasePage";


const PageView = ({page}: PageProps) => {
    return (
        <div className={`page`}
             style={{margin: "10px", padding: "10px", border: "2px solid lightgrey"}}>
            <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>Page debug:</h6>
            <h3 style={{marginTop: "0", marginBottom: "8px"}}>{page.descriptor}</h3>
            <DataDump label="config" data={page.configAsJson} />
            <DataDump label="regions" data={page.regions} />
        </div>);
}

const LayoutView = ({layout}: LayoutProps ) => (
    <div className={`layout`}
        style={{marginTop: "2rem", padding: "10px", border: "2px solid lightgrey"}}>
        <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>Layout debug:</h6>
        <h3 style={{marginTop: "0", marginBottom: "8px"}}>{layout.descriptor}</h3>
        <DataDump label="config" data={layout.config} />
        <DataDump label="regions" data={layout.regions} />
    </div>
);

const PartView = ({part}: PartProps) => (
    <div className={`part`}
         style={{marginTop: "2rem", padding: "10px", border: "2px solid lightgrey"}}>
        <h6 style={{fontSize: ".7em", fontWeight:"normal", color:"#bbb", marginTop: "0", marginBottom: "0"}}>Part debug:</h6>
        <h3 style={{marginTop: "0", marginBottom: "8px"}}>{part.descriptor}</h3>
        <DataDump label="config" data={part.config} />
    </div>
);

const DefaultView = ({content}: any) => {
    return (
        <div style={{padding: "10px"}}>
            <h6 style={{fontSize: ".7em", fontWeight:"normal", color:"#bbb", marginTop: "0", marginBottom: "0"}}>Content debug:</h6>
            <h2>{content.displayName}</h2>
            <DataDump label="content" data={content} />
        </div>
    )
}

// 
export default IS_DEV_MODE
    ? DefaultView
    : Empty; // TODO: Should return 404 + log error about missing component mapping


export const PageDevView = IS_DEV_MODE
    ? PageView
    : Empty; // TODO: Should return 404 + log error about missing component mapping



export const LayoutDevView = IS_DEV_MODE
    ? LayoutView
    : Empty;


export const PartDevView = IS_DEV_MODE
    ? PartView
    : Empty;


