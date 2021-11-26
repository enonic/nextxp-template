import React from "react"
import {PORTAL_COMPONENT_ATTRIBUTE, PORTAL_REGION_ATTRIBUTE} from '../../enonic-connection-config';

import _Text from "./_Text";
import _Part from "./_Part";
import _Image from "./_Image";

const componentTypeSelector = {
    'text': _Text,
    'part': _Part,
    'image': _Image
};

interface Component {
    type: string;
    path: string;
    text?: string;
    image?: string;
    descriptor?: string;
    config?: Record<string, any>;
}

interface _Region {
    name: string;
    components: Component[];
}

export type RegionProps = {
    regions: _Region | { [key: string]: _Region } | undefined;    // Accept one selected, or all, regions. Target one particular region by passing in that subobject instead of all regions
}


const Component = (component: Component) => {

    const cmpAttrs: { [key: string]: string } = {
        [PORTAL_COMPONENT_ATTRIBUTE]: component.type
    };

    const ComponentView = componentTypeSelector[component.type] || <p>I am a {component.type}</p>;

    return (
        <div {...cmpAttrs}>
            <ComponentView {...component}/>
        </div>
    )
}


const SingleRegion = ({name, components}: _Region) => {
    const regionAttrs: { [key: string]: string } = {
        id: name + "Region",
        [PORTAL_REGION_ATTRIBUTE]: name,
    };

    return (
        <div id={`${name}Region`} data-portal-region={name}>
            {
                components?.map((component: Component, i: number) => (
                    <Component key={regionAttrs.id + "-" + i} {...component} />
                ))
            }
        </div>
    )
}


/** One or more XP regions */
const _Region = ({regions}: RegionProps) => {


    // Detect if regions is a single, selected region and if so, handle that
    if (Array.isArray(regions?.components)) {
        return <SingleRegion {...regions} />;

    } else if (!regions) {
        return null;
    }

    return (
        <>
            {
                Object.keys(regions).map((name: string, i) => {
                    const region: _Region = regions![name];
                    return <SingleRegion key={i} {...region} />;
                })
            }
        </>
    );
}

export default _Region;
