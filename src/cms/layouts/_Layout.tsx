import React from "react";

import {IS_DEV_MODE} from "../../xpAdapter/enonic-connection-config";

import {RegionTree} from "../queries/_getMetaData";
import DataDump from "../../xpAdapter/views/DataDump";
import Empty from "../../xpAdapter/views/Empty";

export interface LayoutProps {
    layout: {
        descriptor?: string;
        regions?: RegionTree;
    };
    content: any;
}

const DefaultLayoutViewDev = ({layout}: LayoutProps) => (
    <div className={`layout ${(layout.descriptor || "").replace(/[.\-:]/g, "_")}`}
         style={{marginTop: "2rem"}}>
        <h6 style={{fontSize: ".7em", fontWeight:"normal", color:"#bbb", marginTop: "0", marginBottom: "0"}}>_Part.tsx:</h6>
        <h3 style={{marginTop: "0", marginBottom: "8px"}}>{layout.descriptor}</h3>

        <DataDump label="regions" data={layout.regions} />
    </div>
);

const DefaultLayoutView = IS_DEV_MODE
    ? DefaultLayoutViewDev
    : Empty;

export default DefaultLayoutView;
