import React from "react";
import {FetchContentResult} from "../guillotine/fetchContent";
import {TypesRegistry} from '../ComponentRegistry';
import BasePage from './BasePage';
import DataDump from "./DataDump";
import Empty from "./Empty";
import {IS_DEV_MODE} from "../utils";
import Error from "../../pages/_error";


const BaseContent = (props: FetchContentResult) => {
    const {content, meta} = props;

    if (!content) {
        console.warn("No 'content' data in BasePage props");
        return null;
    }

    if (!meta?.type) {
        console.warn("BasePage props are missing 'meta.type'");
        return null;
    }

    const typeDef = TypesRegistry.getContentType(meta.type);
    const ContentTypeView = typeDef?.view;

    if (ContentTypeView) {
        // there is a mapping for this type
        return <ContentTypeView {...props}/>
    } else if (meta.canRender) {
        // content has a page component
        return <BasePage {...props}/>
    }

    console.log(`BaseContent: can not render ${meta.type} at ${meta.path}: no content type or page view defined`);
    return null;
}

export default BaseContent;


const ContentView = ({content}: any) => {
    return (
        <div style={{padding: "10px"}}>
            <h6 style={{fontSize: ".7em", fontWeight:"normal", color:"#bbb", marginTop: "0", marginBottom: "0"}}>Dev mode - Content Type:</h6>
            <h2>{content.displayName}</h2>
            <DataDump label="content" data={content} />
        </div>
    )
}

export const ContentDevView = IS_DEV_MODE
    ? ContentView
    : () => <Error code="404" message="Unable to render" />;
    