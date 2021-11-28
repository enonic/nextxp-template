/** Render only one component as a result of a request from XP-side .../_/component/... during edit refresh. */

import BaseComponent from "./_BaseComponent";
import React from "react";
import {FetchContentResult} from "../guillotine/fetchContent";

const SingleComponent = ({page, meta, content}: FetchContentResult) => {
    if (!page?.regions || !Object.keys(page.regions)) {
        // TODO: Fallback when view.regions is missing/empty (throw an error? 404?)
    }

    // Pick region name from target, eg. "main" from "/main/0"
    const targetRegion = (meta.requestedComponent || "")
        .replace(/^\/?/, '')
        .split("/")[0]

    if (!targetRegion || !page!.regions![targetRegion]) {
        // TODO: Handle missing target region (Throw a 404, "component path not found"?)
    }

    const region = page!.regions![targetRegion]!;
    const targetCompData = region.components.find(comp => comp.path === meta.requestedComponent);

    if (!targetCompData) {
        // TODO: Fallback for when target region or component is not found (render a placeholder? Throw a 404, "component path not found"?)
    }

    return <BaseComponent component={targetCompData!} content={content} />;
}

export default SingleComponent;
