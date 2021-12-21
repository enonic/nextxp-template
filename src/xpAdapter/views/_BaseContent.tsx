import React from "react";

import {FetchContentResult} from "../guillotine/fetchContent";

import DefaultContentView from "../../cms/contentTypes/_DefaultView";

import {TypesRegistry} from '../TypesRegistry';


const BaseContent = (props: FetchContentResult) => {
    const {content, meta, page} = props;

    if (!content) {
        console.warn("No 'content' data in BasePage props");
        return null;
    }

    if (!meta || !meta.type) {
        console.warn("BasePage props are missing 'meta.type'. Falling back to _Default view type.");
    }

    const typeDef = TypesRegistry.getContentType(meta.type);
    const SelectedPageView = typeDef?.view;

    if (SelectedPageView) {
        // there is a view defined for this type
        return <SelectedPageView content={content} page={page}/>
    } else if (meta.canRender) {
        // there is a page controller for this type
        return <DefaultContentView content={content} page={page}/>
    }

    console.log(`BaseContent: can not render ${meta.type} at ${meta.path}: no next view or page controller defined`);
    return null;
}

export default BaseContent;
