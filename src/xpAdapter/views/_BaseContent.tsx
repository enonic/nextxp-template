import React from "react";

import {FetchContentResult} from "../guillotine/fetchContent";

import {TypesRegistry} from '../TypesRegistry';
import RegionsView from './_Region';


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
        // component attr is used by FragmentView
        return <SelectedPageView content={content} page={page} component={page?.regions} meta={meta}/>
    } else if (meta.canRender) {
        // there is a page controller
        return <RegionsView content={content} regions={page?.regions} meta={meta}/>
    }

    console.log(`BaseContent: can not render ${meta.type} at ${meta.path}: no next view or page controller defined`);
    return null;
}

export default BaseContent;
