import React from "react"
import {LayoutData, RegionTree} from "../../cms/queries/_getMetaData";
import {TypesRegistry} from '../TypesRegistry';


interface BaseLayoutProps {
    component?: LayoutData;
    regions?: RegionTree;
    content?: any;
}

const BaseLayout = (props: BaseLayoutProps) => {

    // console.info('BaseLayout:');
    // console.info(JSON.stringify(props, null, 2));

    const {component, content, regions} = props;
    let layoutSelection;
    if (component) {
        layoutSelection = TypesRegistry.getLayout(component.descriptor);
    }
    const SelectedLayoutView = layoutSelection?.view;
    if (SelectedLayoutView) {
        return <SelectedLayoutView layout={{descriptor: component?.descriptor, regions}}
                                   content={content}/>;
    } else {
        console.log(`BaseLayout: can not render layout '${component?.descriptor}': no next view or catch-all defined`);
        return null;
    }
}

export default BaseLayout;
