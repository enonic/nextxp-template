import React from "react"
import { PORTAL_REGION_ATTRIBUTE } from '../../enonic-connection-config';

import Component, {BaseComponentI} from "./_BaseComponent";

interface ComponentI {
    type: string;
    path: string;
}

interface RegionI {
    name: string;
    components: ComponentI[];
}

type RegionTree = { [key: string]: RegionI }

interface RegionProps {
    name: string;
    components: BaseComponentI[];

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

export type PageProps = {
    components?: ComponentI[]
}

type Props = {
    page: PageProps;
    selected?: string;

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

//-------------------------------------------------------------

function getInfo(cmp: ComponentI): { region: string, index: number } | undefined {
    const match = cmp.path.match(/\/(\w+)\/(\d+)/);
    if (match) {
        return {
            region: match[1],
            index: +match[2],
        }
    }
    return;
}

function buildRegionTree(comps: ComponentI[]): RegionTree {
    const regions: RegionTree = {};
    comps.forEach(cmp => {
        const info = getInfo(cmp);
        if (info) {
            let region = regions[info.region];
            if (!region) {
                region = {
                    name: info.region,
                    components: [],
                };
                regions[info.region] = region;
            }
            region.components.push(cmp);
        } else {
            // this is page component
            // TODO: something here later, if we're making a pageSelector too
        }
    });
    return regions;
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
                components?.map((component: BaseComponentI, i: number) => (
                    <Component key={regionAttrs.id + "-" + i} component={component} content={content} />
                ))
            }
        </div>
    )
}


/** Multiple XP regions, or only one if named in props.selected */
const Region = (props: Props) => {
    const {page, selected, content} = props;
    if (!page?.components || !page!.components!.length) {
        return null;
    }

    console.log("page?.components:", page?.components);

    const regions = buildRegionTree(page?.components!);

    console.log("--> regions:", JSON.stringify(regions, null, 2));



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
