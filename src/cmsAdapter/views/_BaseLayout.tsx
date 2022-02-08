import React from "react"
import {LayoutData, MetaData, RegionTree} from "../guillotine/_getMetaData";
import {TypesRegistry} from '../TypesRegistry';

export interface LayoutProps {
    layout: LayoutData;
    content: any;
    meta: MetaData;
}

interface BaseLayoutProps {
    component?: LayoutData;
    regions?: RegionTree;
    content?: any;
    meta: MetaData;
}

const BaseLayout = (props: BaseLayoutProps) => {

    const {component, content, regions, meta} = props;
    let layoutSelection;
    if (component) {
        layoutSelection = TypesRegistry.getLayout(component.descriptor);
    }
    const SelectedLayoutView = layoutSelection?.view;
    if (SelectedLayoutView) {
        return <SelectedLayoutView layout={{descriptor: component?.descriptor, regions: regions || {}}}
                                   content={content}
                                   meta={meta}/>;
    } else {
        console.log(`BaseLayout: can not render layout '${component?.descriptor}': no next view or catch-all defined`);
        return null;
    }
}

export default BaseLayout;
