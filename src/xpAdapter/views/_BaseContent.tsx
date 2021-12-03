import React from "react";

import {FetchContentResult} from "../guillotine/fetchContent";

import DefaultContentView from "../../customXp/contentTypes/_DefaultView";

import contentSelector from "../../customXp/contentSelector";
import {TypeSelection} from "../../customXp/_selectorTypes";


const BaseContent = (props: FetchContentResult) => {
    const {content, meta, page} = props;

    if (!content) {
        console.warn("No 'content' data in BasePage props");
        return null;
    }

    if (!meta || !meta.type) {
        console.warn("BasePage props are missing 'meta.type'. Falling back to _Default view type.");
    }

    const typeSelection: TypeSelection = (contentSelector || {})[meta.type]
    const SelectedPage = typeSelection?.view || DefaultContentView;

    // @ts-ignore
    return <SelectedPage content={content} page={page} />;
}

export default BaseContent;
