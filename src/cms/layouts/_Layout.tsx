import React from "react";

import {IS_DEV_MODE} from "../../xpAdapter/enonic-connection-config";

import {RegionTree} from "../queries/_getMetaData";

export interface LayoutProps {
    layout: {
        descriptor?: string;
        regions?: RegionTree;
    };
    content: any;
}

const DefaultLayoutView = IS_DEV_MODE
    ? ({layout}: LayoutProps) => (
        <div className={`layout ${(layout.descriptor || "").replace(/[.\-:]/g, "_")}`}
             style={{marginTop: "2rem"}}>
            <h6 style={{fontSize: ".7em", fontWeight:"normal", color:"#bbb", marginTop: "0", marginBottom: "0"}}>_Part.tsx:</h6>
            <h3 style={{marginTop: "0", marginBottom: "8px"}}>{layout.descriptor}</h3>
            { layout.regions && (
                <>
                    <h5 style={{marginTop: "0", marginBottom: "0"}}>regions:</h5>
                    <pre style={{fontSize: ".8em", width: "100%", whiteSpace: "pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(layout.regions, null, 2)}</pre>
                </>
            )}

        </div>
    )
    : () => <></>;

export default DefaultLayoutView;
