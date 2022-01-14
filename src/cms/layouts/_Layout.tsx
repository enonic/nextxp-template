import React from "react";

import {IS_DEV_MODE} from "../../enonicAdapter/enonic-connection-config";

import {MetaData, RegionTree} from "../../enonicAdapter/guillotine/_getMetaData";
import DataDump from "../../enonicAdapter/views/DataDump";
import Empty from "../../enonicAdapter/views/Empty";

export interface LayoutProps {
    layout: {
        descriptor?: string;
        regions: RegionTree;
    };
    content: any;
    meta: MetaData;
}

const DefaultLayoutViewDev = ({layout}: LayoutProps) => (
    <div className={`layout ${(layout.descriptor || "").replace(/[.\-:]/g, "_")}`}
         style={{marginTop: "2rem"}}>
        <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>_Layout.tsx:</h6>
        <h3 style={{marginTop: "0", marginBottom: "8px"}}>{layout.descriptor}</h3>

        <DataDump label="regions" data={layout.regions} />
    </div>
);

const DefaultLayoutView = IS_DEV_MODE
    ? DefaultLayoutViewDev
    : Empty;

export default DefaultLayoutView;
