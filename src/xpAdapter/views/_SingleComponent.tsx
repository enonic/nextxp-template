/** Render only one component as a result of a request from XP-side .../_/component/... during edit refresh. */

import BaseComponent from "./_BaseComponent";
import React from "react";
import {FetchContentResult} from "../guillotine/fetchContent";

const SingleComponent = ({meta, content}: FetchContentResult) => {

    if (!meta?.requestedComponent) {
        // TODO: Handle missing target region (Throw a 404, "component path not found"?)
        return null;
    }

    return <BaseComponent component={meta.requestedComponent} content={content} meta={meta}/>;
}

export default SingleComponent;
