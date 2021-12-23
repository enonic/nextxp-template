import React from "react";

import {FetchContentResult} from "../guillotine/fetchContent";

import {TypesRegistry} from '../TypesRegistry';
import RegionsView from './_Region';


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
    const SelectedPageView = typeDef?.view;

    if (SelectedPageView) {
        // there is a view defined for this type
        return <SelectedPageView {...props}/>
    } else if (meta.canRender) {
        // there is a page controller
        return <RegionsView {...props} meta={meta!}/>
    }

    console.log(`BaseContent: can not render ${meta.type} at ${meta.path}: no next view or page controller defined`);
    return null;
}

export default BaseContent;
