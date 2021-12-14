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

    const typeSelection = TypesRegistry.getContentType(meta.type);
    const SelectedPageView = typeSelection?.view || DefaultContentView;

    return <SelectedPageView content={content} page={page}/>;
}

export default BaseContent;
