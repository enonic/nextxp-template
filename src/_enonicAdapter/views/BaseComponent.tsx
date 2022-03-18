import React from "react";

import {PORTAL_COMPONENT_ATTRIBUTE, RENDER_MODE, XP_COMPONENT_TYPE} from "../utils";
import {MetaData, PageComponent} from "../guillotine/getMetaData";
import {ComponentRegistry} from '../ComponentRegistry';


export type BaseComponentProps = {
    component: PageComponent;
    meta: MetaData;
    content?: any;                  // Content is passed down for optional consumption in componentviews.
    // TODO: Use a react contextprovider instead of "manually" passing everything down
}

const BaseComponent = ({component, meta, content}: BaseComponentProps) => {
    const {type, data, error} = component;
    const divAttrs: { [key: string]: string } = {
        [PORTAL_COMPONENT_ATTRIBUTE]: type
    };

    const ComponentView = ComponentRegistry.getComponent(type)?.view || (() => {
        console.error(`Missing view for component type '${type}'`);
        return <></>;
    });

    const cmpAttrs: { [key: string]: any } = {
        component: component[type],
        meta,
        content,
    };

    if (data) {
        cmpAttrs.data = data;
    }

    if (error) {
        cmpAttrs.error = error;
    }

    if (component.type === XP_COMPONENT_TYPE.LAYOUT) {
        // add regions to layout because they are not present in component[component.type] above
        cmpAttrs.regions = component.regions;
    }

    if (meta.renderMode === RENDER_MODE.LIVE) {
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
