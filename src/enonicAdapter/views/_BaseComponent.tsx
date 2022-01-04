import React from "react";

import {PORTAL_COMPONENT_ATTRIBUTE, XP_COMPONENT_TYPE, XP_RENDER_MODE} from "../enonic-connection-config";
import {MetaData, PageComponent} from "../guillotine/_getMetaData";
import {TypesRegistry} from '../TypesRegistry';


export type BaseComponentProps = {
    component: PageComponent;
    meta: MetaData;
    content?: any;                  // Content is passed down for optional consumption in componentviews.
    // TODO: Use a react contextprovider instead of "manually" passing everything down
}

const BaseComponent = ({component, meta, content}: BaseComponentProps) => {
    const {type, data} = component;
    const divAttrs: { [key: string]: string } = {
        [PORTAL_COMPONENT_ATTRIBUTE]: type
    };

    const ComponentView = TypesRegistry.getComponent(type)?.view || (() => {
        console.error(`Missing view for component type '${type}'`);
        return <></>;
    });

    const cmpAttrs: { [key: string]: any } = {
        component: component[type],
        data,
        meta,
        content,
    };

    if (component.type === XP_COMPONENT_TYPE.LAYOUT) {
        // add regions to layout because they are not present in component[component.type] above
        cmpAttrs.regions = component.regions;
    }

    if (meta.renderMode === XP_RENDER_MODE.LIVE) {
        // do not make component wrappers in live mode
        return <ComponentView {...cmpAttrs}/>
    } else {
        return (
            <div {...divAttrs}>
                <ComponentView {...cmpAttrs}/>
            </div>
        )
    }
}
export default BaseComponent;
