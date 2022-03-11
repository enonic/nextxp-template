import React from "react"
import {LayoutData, MetaData, RegionTree} from "../guillotine/getMetaData";
import {TypesRegistry} from '../ComponentRegistry';
import {IS_DEV_MODE} from "../utils";
import DataDump from "./DataDump";
import Empty from './Empty';

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
        return <SelectedLayoutView layout={{descriptor: component?.descriptor, regions: regions || {}, config: component?.config}}
                                   content={content}
                                   meta={meta}/>;
    } else {
        console.log(`BaseLayout: can not render layout '${component?.descriptor}': no next view or catch-all defined`);
        return null;
    }
}

export default BaseLayout;


const LayoutView = ({layout}: LayoutProps ) => (
    <div className={`layout`}
        style={{marginTop: "2rem", padding: "10px", border: "2px solid lightgrey"}}>
        <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>Layout debug:</h6>
        <h3 style={{marginTop: "0", marginBottom: "8px"}}>{layout.descriptor}</h3>
        <DataDump label="config" data={layout.config} />
        <DataDump label="regions" data={layout.regions} />
    </div>
);

export const LayoutDevView = IS_DEV_MODE
    ? LayoutView
    : Empty;
