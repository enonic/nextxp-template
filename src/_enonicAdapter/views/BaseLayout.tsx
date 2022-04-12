import React from "react"
import {LayoutData, MetaData, RegionTree} from "../guillotine/getMetaData";
import {ComponentRegistry} from '../ComponentRegistry';
import {XP_COMPONENT_TYPE} from '../utils';
import {MissingComponent, shouldShowMissingView} from './BaseComponent';

export interface LayoutProps {
    layout: LayoutData;
    common: any;
    meta: MetaData;
}

interface BaseLayoutProps {
    component?: LayoutData;
    regions?: RegionTree;
    common?: any;
    meta: MetaData;
}

const BaseLayout = (props: BaseLayoutProps) => {

    const {component, common, regions, meta} = props;
    let layoutSelection;
    if (component) {
        layoutSelection = ComponentRegistry.getLayout(component.descriptor);
    }
    const SelectedLayoutView = layoutSelection?.view;
    if (SelectedLayoutView) {
        return <SelectedLayoutView layout={{descriptor: component?.descriptor, regions: regions || {}, config: component?.config}}
                                   common={common}
                                   meta={meta}/>;
    } else if (component?.descriptor) {
        // empty descriptor usually means uninitialized layout
        console.warn(`BaseLayout: can not render layout '${component?.descriptor}': no next view or catch-all defined`);
        if (shouldShowMissingView(meta)) {
            return <MissingComponent type={XP_COMPONENT_TYPE.LAYOUT} descriptor={component.descriptor}/>
        }
    }
    return null;
}

export default BaseLayout;
