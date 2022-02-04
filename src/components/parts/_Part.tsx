import React from "react";

import {IS_DEV_MODE} from "../../cmsAdapter/connection-config";
import DataDump from "../../cmsAdapter/views/DataDump";
import Empty from "../../cmsAdapter/views/Empty";

export interface PartProps {
    part: {
        descriptor?: string;
        config?: any;
    };
    data?: any;
    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

const PartViewDev = ({part}: PartProps) => (
    <div className={`part ${(part.descriptor || "").replace(/[.\-:]/g, "_")}`}
         style={{marginTop: "2rem"}}>
        <h6 style={{fontSize: ".7em", fontWeight:"normal", color:"#bbb", marginTop: "0", marginBottom: "0"}}>_Part.tsx:</h6>
        <h3 style={{marginTop: "0", marginBottom: "8px"}}>{part.descriptor}</h3>
        <DataDump label="config" data={part.config} />
    </div>
);

const FallbackPartView = IS_DEV_MODE
    ? PartViewDev
    : Empty;

export default FallbackPartView;
