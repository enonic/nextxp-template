import React from "react"
import {PORTAL_COMPONENT_ATTRIBUTE, PORTAL_REGION_ATTRIBUTE} from '../../pages/_app';
import componentSelector from '../pageeditor/componentSelector';

interface Component {
    type: string;
    path: string;
}

interface Region {
    name: string;
    components: Component[];
}

type Props = {
    components: Component[];
}

const EditModeFullPage = (props: Props) => {
    /*    console.info(`EditModeFullPage: props`)
        console.dir(props, {depth: null});*/

    const components = props.components || [];
    const regions = buildRegionTree(components);

    console.info(`EditModeFullPage: component tree`)
    console.dir(regions, {depth: null});

    return (
        <>
            {
                Object.keys(regions).map((name: string) => {
                    const regionAttrs: { [key: string]: string } = {
                        id: name + "Region",
                        [PORTAL_REGION_ATTRIBUTE]: name,
                    };
                    return (
                        <div key={regionAttrs.id} {...regionAttrs}>
                            {
                                regions[name].components?.map((component: Component, i: number) => {
                                    const cmpAttrs: { [key: string]: string } = {
                                        [PORTAL_COMPONENT_ATTRIBUTE]: component.type
                                    };
                                    const ComponentView = componentSelector[component.type];
                                    return (
                                        <div key={regionAttrs.id + "-" + i} {...cmpAttrs}>
                                            <ComponentView {...component}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </>
    )
}

export default EditModeFullPage;

function getInfo(cmp: Component): { region: string, index: number } | undefined {
    const match = cmp.path.match(/\/(\w+)\/(\d+)/);
    if (match) {
        return {
            region: match[1],
            index: +match[2],
        }
    }
    return;
}

function buildRegionTree(cmps: Component[]): { [key: string]: Region } {
    const regions: { [key: string]: Region } = {};
    cmps.forEach(cmp => {
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
        }
    });
    return regions;
}
