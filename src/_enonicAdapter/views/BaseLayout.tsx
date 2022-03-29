import React from "react"
import {LayoutData, MetaData, RegionTree} from "../guillotine/getMetaData";
import {ComponentRegistry} from '../ComponentRegistry';
import {IS_DEV_MODE} from "../utils";
import DataDump from "./DataDump";
import Empty from './Empty';

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
    }
    return null;
}

export default BaseLayout;


const LayoutView = ({layout}: LayoutProps) => (
    <div className={`layout`}
         style={{marginTop: "2rem", padding: "10px", border: "2px solid lightgrey"}}>
        <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>Layout debug:</h6>
        <h3 style={{marginTop: "0", marginBottom: "8px"}}>{layout.descriptor}</h3>
        <DataDump label="config" data={layout.config}/>
        <DataDump label="regions" data={layout.regions}/>
    </div>
);

export const LayoutDevView = IS_DEV_MODE
                             ? LayoutView
                             : Empty;
