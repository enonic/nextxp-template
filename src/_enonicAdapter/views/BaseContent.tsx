import React from "react";
import {FetchContentResult} from "../guillotine/fetchContent";
import {TypesRegistry} from '../ComponentRegistry';
import BasePage from './BasePage';
import DataDump from "./DataDump";
import {IS_DEV_MODE} from "../utils";
import Error from "../../pages/_error";


const BaseContent = (props: FetchContentResult) => {
    const {content, meta, page} = props;

    if (!content) {
        console.warn("No 'content' data in BasePage props");
        return null;
    }

    if (!meta?.type) {
        console.warn("BasePage props are missing 'meta.type'");
        return null;
    }

    const pageDesc = page?.descriptor;
    const typeDef = TypesRegistry.getContentType(meta.type);
    const pageDef = pageDesc ? TypesRegistry.getPage(pageDesc) : undefined;
    const ContentTypeView = typeDef?.view;

    if (ContentTypeView && !typeDef?.catchAll) {
        console.info(`BaseContent: rendering '${meta.type}' with content type: ${ContentTypeView.name}`);
        return <ContentTypeView {...props}/>
    } else if (pageDef?.view) {
        console.info(`BaseContent: rendering '${meta.type}' with page: ${BasePage.name}`);
        return <BasePage {...props}/>;
    } else if (ContentTypeView) {
        console.info(`BaseContent: rendering '${meta.type}' with content type catch-all: ${ContentTypeView.name}`);
        return <ContentTypeView {...props}/>
    }

    console.log(`BaseContent: can not render ${meta.type}: no content type or page view defined`);
    return null;
}

export default BaseContent;


const ContentView = ({content}: any) => {
    return (
        <div style={{padding: "10px"}}>
            <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>Dev mode - Content
                Type:</h6>
            <h2>{content.displayName}</h2>
            <DataDump label="content" data={content}/>
        </div>
    )
}

export const ContentDevView = IS_DEV_MODE
                              ? ContentView
                              : () => <Error code="404" message="Unable to render"/>;
