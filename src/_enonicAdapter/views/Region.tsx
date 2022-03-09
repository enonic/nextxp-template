import React from "react"
import {PORTAL_REGION_ATTRIBUTE, RENDER_MODE} from '../constants';

import BaseComponent from "./BaseComponent";
import {MetaData, PageComponent, PageData} from "../guillotine/getMetaData";

export interface RegionProps {
    name: string;
    components?: PageComponent[];
    className?: string;
    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
    meta: MetaData;
}

export interface RegionsProps {
    page: PageData | null;
    name?: string;
    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
    meta: MetaData;
}

/** Single region */
export const RegionView = (props: RegionProps) => {
    const {name, components, content, meta, className} = props;
    const regionAttrs: { [key: string]: string } = {
        id: name + "Region",
        [PORTAL_REGION_ATTRIBUTE]: name,
    };
    if (className) {
        regionAttrs.className = className;
    }

    const children = (components || []).map((component: PageComponent, i: number) => (
        <BaseComponent key={regionAttrs.id + "-" + i} component={component} content={content} meta={meta}/>
    ))

    if (meta.renderMode === RENDER_MODE.LIVE) {
        // do not make region wrappers in live mode
        return (<>{children}</>)
    } else {
        return <div {...regionAttrs}>{children}</div>;
    }
}


/** Multiple regions, or only one if named in props.selected */
const RegionsView = (props: RegionsProps) => {
    const {page, name, meta, content} = props;
    const regions = page?.regions;
    if (!regions || !Object.keys(regions)) {
        return null;
    }

    // Detect if any single region is selected for rendering and if so, handle that
    if (name) {
        const selectedRegion = regions[name];
        if (!selectedRegion) {
            console.warn(
                `Region name '${name}' was selected but not found among regions (${JSON.stringify(Object.keys(regions))}). Skipping.`);    // TODO: Throw error instead of this? Return null?
            return null;
        }
        return <RegionView {...selectedRegion} content={content} meta={meta}/>;
    }

    return (
        <>
            {
                Object.keys(regions).map((name: string, i) => {
                    const region = regions![name];
                    return <RegionView key={i} {...region} content={content} meta={meta}/>;
                })
            }
        </>
    );
}

export default RegionsView;
