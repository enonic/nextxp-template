import React from "react";

import {PORTAL_COMPONENT_ATTRIBUTE, RENDER_MODE, XP_COMPONENT_TYPE} from "../utils";
import {MetaData, PageComponent} from "../guillotine/getMetaData";
import {ComponentRegistry} from '../ComponentRegistry';


export type BaseComponentProps = {
    component: PageComponent;
    meta: MetaData;
    common?: any;                  // Content is passed down for optional consumption in componentviews.
    // TODO: Use a react contextprovider instead of "manually" passing everything down
}

const BaseComponent = ({component, meta, common}: BaseComponentProps) => {
    const {type, data, error} = component;
    const divAttrs: { [key: string]: string } = {
        [PORTAL_COMPONENT_ATTRIBUTE]: type
    };

    const ComponentView = ComponentRegistry.getComponent(type)?.view || (() => {
        console.warn(`BaseComponent: can not render component '${type}': no next view or catch-all defined`);
        return <></>;
    });

    const cmpAttrs: { [key: string]: any } = {
        component: component[type],
        meta,
        common,
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
