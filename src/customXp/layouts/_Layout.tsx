import React from "react";
import {RegionTree} from "../queries/_getMetaData";

export interface LayoutProps {
    layout: {
        descriptor?: string;
        regions?: RegionTree;
    };
    content: any;
}

const DefaultLayoutView = ({layout}: LayoutProps) => (
    <div className={`layout ${(layout.descriptor || "").replace(/[.\-:]/g, "_")}`}
         style={{marginTop: "2rem"}}>
        <h6 style={{marginTop: "0", marginBottom: "0"}}>DefaultLayout:</h6>
        <h3 style={{marginTop: "0", marginBottom: "8px"}}>{layout.descriptor}</h3>
        <pre style={{fontSize: ".8em", width: "100%", whiteSpace: "pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(layout.regions, null,
            2)}</pre>
    </div>
);
export default DefaultLayoutView;
