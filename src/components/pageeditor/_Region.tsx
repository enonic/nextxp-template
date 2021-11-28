import React from "react"
import { PORTAL_REGION_ATTRIBUTE } from '../../enonic-connection-config';

import Component from "./_BaseComponent";
import {PageData} from "../../guillotine/fetchContent";
import {PageComponent} from "../../selectors/queries/_getMetaData";

interface RegionProps {
    name: string;
    components: PageComponent[];

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

type Props = {
    page: PageData;
    selected?: string;

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}


// ------------------------------------------------------------

/** One XP region */
const SingleRegion = ({name, components, content}: RegionProps) => {
    const regionAttrs: { [key: string]: string } = {
        id: name + "Region",
        [PORTAL_REGION_ATTRIBUTE]: name,
    };

    return (
        <div id={`${name}Region`} data-portal-region={name}>
            {
                components?.map((component: PageComponent, i: number) => (
                    <Component key={regionAttrs.id + "-" + i} component={component} content={content} />
                ))
            }
        </div>
    )
}


/** Multiple XP regions, or only one if named in props.selected */
const Region = (props: Props) => {
    const {page, selected, content} = props;
    if (!page?.regions || !Object.keys(page.regions)) {
        return null;
    }

    const regions = page.regions;

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
