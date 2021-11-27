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

interface ComponentProps {
    type: string;
    path: string;
    text?: string;
    image?: string;
    descriptor?: string;
    config?: Record<string, any>;

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

interface RegionProps {
    name: string;
    components: ComponentProps[];

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

export type PageProps = {
    pageAsJson?: {
        regions?: { [key: string]: RegionProps }    // Accept one selected, or all, regions. Target one particular region by passing in that subobject instead of all regions
    }
}

type Props = {
    page: PageProps;
    selected?: string;

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

const Component = (component: ComponentProps) => {
    const {type} = component;
    const cmpAttrs: { [key: string]: string } = {
        [PORTAL_COMPONENT_ATTRIBUTE]: type
    };

    const ComponentView = componentTypeSelector[type] || <p>I am a {type}</p>;

    return (
        <div {...cmpAttrs}>
            <ComponentView {...component}/>
        </div>
    )
}


const SingleRegion = ({name, components, content}: RegionProps) => {
    const regionAttrs: { [key: string]: string } = {
        id: name + "Region",
        [PORTAL_REGION_ATTRIBUTE]: name,
    };

    return (
        <div id={`${name}Region`} data-portal-region={name}>
            {
                components?.map((component: ComponentProps, i: number) => (
                    <Component key={regionAttrs.id + "-" + i} {...component} content={content} />
                ))
            }
        </div>
    )
}


/** One or more XP regions */
const Region = (props: Props) => {
    const {page, selected, content} = props;

    const {regions} = page?.pageAsJson || {};

    if (!regions || !Object.keys(regions)) {
        return null;
    }

    // Detect if any single region is selected for rendering and if so, handle that
    if (selected) {
        const selectedRegion = regions[selected];
        if (!selectedRegion) {
            console.warn(`Region name '${selected}' was selected but not found among regions (${JSON.stringify(Object.keys(regions))}). Skipping.`);    // TODO: Throw error instead of this? Return null?
            return null;
        }
        return <SingleRegion {...selectedRegion} content={content} />;
    }

    return (
        <>
            {
                Object.keys(regions).map((name: string, i) => {
                    const region = regions![name];
                    return <SingleRegion key={i} {...region} content={content} />;
                })
            }
        </>
    );
}

export default Region;
