import React from "react";

import {IS_DEV_MODE} from "../../cmsAdapter/connection-config";
import {MetaData, RegionTree} from "../../cmsAdapter/guillotine/_getMetaData";
import DataDump from "../../cmsAdapter/views/DataDump";
import Empty from "../../cmsAdapter/views/Empty";

export interface LayoutProps {
    layout: {
        descriptor?: string;
        regions: RegionTree;
    };
    content: any;
    meta: MetaData;
}

const LayoutViewDev = ({layout}: LayoutProps) => (
    <div className={`layout ${(layout.descriptor || "").replace(/[.\-:]/g, "_")}`}
         style={{marginTop: "2rem"}}>
        <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>_Layout.tsx:</h6>
        <h3 style={{marginTop: "0", marginBottom: "8px"}}>{layout.descriptor}</h3>

        <DataDump label="regions" data={layout.regions} />
    </div>
);

const FallbackLayoutView = IS_DEV_MODE
    ? LayoutViewDev
    : Empty;

export default FallbackLayoutView;
