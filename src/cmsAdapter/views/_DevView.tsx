import React from "react"
import {IS_DEV_MODE} from "../constants";
import DataDump from "./DataDump";
import Empty from "./Empty";

const DefaultView = ({content}: any) => {
    return (
        <div style={{padding: "10px"}}>
            <h6 style={{fontSize: ".7em", fontWeight:"normal", color:"#bbb", marginTop: "0", marginBottom: "0"}}>Content debug:</h6>
            <h2>{content.displayName}</h2>
            <DataDump label="content" data={content} />
        </div>
    )
}

export default IS_DEV_MODE
    ? DefaultView
    : Empty; // TODO: Should return 404 + log error about missing component mapping
    