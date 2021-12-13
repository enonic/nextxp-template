/** Render only one component as a result of a request from XP-side .../_/component/... during edit refresh. */

import BaseComponent from "./_BaseComponent";
import React from "react";
import {FetchContentResult} from "../guillotine/fetchContent";

const SingleComponent = ({page, meta, content}: FetchContentResult) => {
    if (!meta.parentRegion) {
        // TODO: Handle missing target region (Throw a 404, "component path not found"?)
    }

    const targetCompData = meta.parentRegion!.components.find(comp => comp.path === meta.requestedComponent);

    if (!targetCompData) {
        // TODO: Fallback for when target region or component is not found (render a placeholder? Throw a 404, "component path not found"?)
    }

    return <BaseComponent component={targetCompData!} content={content} />;
}

export default SingleComponent;
