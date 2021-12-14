import React from "react"
import {PORTAL_REGION_ATTRIBUTE} from '../enonic-connection-config';

import BaseComponent from "./_BaseComponent";
import {PageComponent, RegionTree} from "../../cms/queries/_getMetaData";

export interface RegionProps {
    name: string;
    components?: PageComponent[];
    className?: string;
    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

export interface RegionsProps {
    regions?: RegionTree;
    name?: string;
    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}


// ------------------------------------------------------------

/** One XP region */
export const RegionView = ({name, components, content, className}: RegionProps) => {
    const regionAttrs: { [key: string]: string } = {
        id: name + "Region",
        [PORTAL_REGION_ATTRIBUTE]: name,
    };
    if (className) {
        regionAttrs.className = className;
    }

    return (
        <div {...regionAttrs}>
            {
                components?.map((component: PageComponent, i: number) => (
                    <BaseComponent key={regionAttrs.id + "-" + i} component={component} content={content}/>
                ))
            }
        </div>
    )
}


/** Multiple XP regions, or only one if named in props.selected */
const RegionsView = (props: RegionsProps) => {
    const {regions, name, content} = props;
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
        return <RegionView {...selectedRegion} content={content}/>;
    }

    return (
        <>
            {
                Object.keys(regions).map((name: string, i) => {
                    const region = regions![name];
                    return <RegionView key={i} {...region} content={content}/>;
                })
            }
        </>
    );
}

export default RegionsView;
