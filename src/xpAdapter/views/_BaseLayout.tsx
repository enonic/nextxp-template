import React from "react"
import {LayoutData, RegionTree} from "../../cms/queries/_getMetaData";
import {TypesRegistry} from '../TypesRegistry';
import DefaultLayoutView from '../../cms/layouts/_Layout';


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
    const SelectedLayoutView = layoutSelection?.view || DefaultLayoutView;
    return <SelectedLayoutView layout={{descriptor: component?.descriptor, regions}}
                               content={content}/>;
}

export default BaseLayout;
