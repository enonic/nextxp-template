import React from "react";
import {FetchContentResult} from "../guillotine/fetchContent";
import {ComponentRegistry} from '../ComponentRegistry';
import BasePage, {BasePageProps} from './BasePage';
import DataDump from "./DataDump";
import {IS_DEV_MODE} from "../utils";
import Error from "../../pages/_error";


const BaseContent = (props: FetchContentResult) => {
    const {common, meta, page} = props;

    if (!meta?.type) {
        console.warn("BaseContent props are missing 'meta.type'");
        return null;
    }

    const pageData = page?.page;
    const pageDesc = pageData?.descriptor;
    const typeDef = ComponentRegistry.getContentType(meta.type);
    const pageDef = pageDesc ? ComponentRegistry.getPage(pageDesc) : undefined;
    const ContentTypeView = typeDef?.view;

    if (ContentTypeView && !typeDef?.catchAll) {
        // console.debug(`BaseContent: rendering '${meta.type}' with content type: ${ContentTypeView.name}`);
        return <ContentTypeView {...props}/>
    } else if (pageDef?.view) {
        // console.debug(`BaseContent: rendering '${meta.type}' with page: ${BasePage.name}`);
        const pageAttrs: BasePageProps = {
            component: pageData,
            meta,
            common,
        };
        if (page?.data) {
            pageAttrs.data = page.data;
        }
        if (page?.error) {
            pageAttrs.error = page.error;
        }

        return <BasePage {...pageAttrs}/>;
    } else if (ContentTypeView) {
        // console.debug(`BaseContent: rendering '${meta.type}' with content type catch-all: ${ContentTypeView.name}`);
        return <ContentTypeView {...props}/>
    }

    console.warn(`BaseContent: can not render ${meta.type}: no content type or page view defined`);
    return null;
}

export default BaseContent;


const ContentView = (props: any) => {
    const {data, common} = props;
    return (
        <div style={{padding: "10px"}}>
            <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>Dev mode - Content
                Type:</h6>
            <h2>Content view</h2>
            <DataDump label="content" data={data}/>
        </div>
    )
}

export const ContentDevView = IS_DEV_MODE
                              ? ContentView
                              : () => <Error code="404" message="Unable to render"/>;
