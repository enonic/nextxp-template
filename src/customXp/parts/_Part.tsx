import React from "react";
import {PartData} from "../queries/_getMetaData";

type Props = {
    part: PartData,

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

const DefaultPartView = ({part}: Props) => (
    <div className={`part ${(part.descriptor || "").replace(/[.\-:]/g, "_")}`}
         style={{marginTop:"2rem"}}>
        <h6 style={{marginTop:"0", marginBottom:"0"}}>DefaultPart:</h6>
        <h3 style={{marginTop:"0", marginBottom: "8px"}}>{part.descriptor}</h3>
        <pre style={{fontSize:".8em", width:"100%", whiteSpace:"pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(part.config, null, 2)}</pre>
    </div>
);
export default DefaultPartView;
