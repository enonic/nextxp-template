import React from "react";

import {IS_DEV_MODE} from "../../xpAdapter/enonic-connection-config";

export interface PartProps {
    part: {
        descriptor?: string;
        config?: any;
    };
    data?: any;
    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

const DefaultPartView = IS_DEV_MODE
    ? ({part}: PartProps) => (
        <div className={`part ${(part.descriptor || "").replace(/[.\-:]/g, "_")}`}
             style={{marginTop: "2rem"}}>
            <h6 style={{fontSize: ".7em", fontWeight:"normal", color:"#bbb", marginTop: "0", marginBottom: "0"}}>_Part.tsx:</h6>
            <h3 style={{marginTop: "0", marginBottom: "8px"}}>{part.descriptor}</h3>
            {
                part.config && (
                    <>
                        <h5 style={{marginTop: "0", marginBottom: "0"}}>config:</h5>
                        <pre style={{fontSize: ".8em", width: "100%", whiteSpace: "pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(part.config, null, 2)}</pre>
                    </>
                )
            }

        </div>
    )
    : () => <></>;

export default DefaultPartView;
