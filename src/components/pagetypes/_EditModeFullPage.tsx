import React from "react"
import {PORTAL_COMPONENT_ATTRIBUTE, PORTAL_REGION_ATTRIBUTE} from '../../pages/_app';
import componentSelector from '../pageeditor/componentSelector';

interface Component {
    type: string;
    path: string;
    text?: string;
    image?: string;
    config?: Record<string, any>;
}

interface Region {
    name: string;
    components: Component[];
}

type Props = {
    pageAsJson: {
        regions: { [key: string]: Region };
    };
    components: [Record<string, any>];
}

const EditModeFullPage = (props: Props) => {

    console.info(`EditModeFullPage`)
    console.dir(props, {depth: null});

    const regions = props.pageAsJson?.regions || {};
    const components = props.components;

    function getComponentData(path: string): Record<string, any> | undefined {
        return components.find((cmp) => cmp.path === path);
    }

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
                                    const cmpData = getComponentData(component.path);
                                    return (
                                        <div key={regionAttrs.id + "-" + i} {...cmpAttrs}>
                                            <ComponentView {...cmpData || component}/>
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
