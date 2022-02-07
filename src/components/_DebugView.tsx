import React from "react"
import {IS_DEV_MODE} from "../cmsAdapter/constants";
import {PageData} from '../cmsAdapter/guillotine/_getMetaData';
import DataDump from "../cmsAdapter/views/DataDump";
import Empty from "../cmsAdapter/views/Empty";


type Props = {
    content?: any,
    page: PageData | null,
}

const DebugView = ({content, page}: Props) => {
    return (
        <div style={{padding: "10px"}}>
            <h6 style={{fontSize: ".7em", fontWeight:"normal", color:"#bbb", marginTop: "0", marginBottom: "0"}}>_DebugView.tsx:</h6>
            <h2>{content.displayName}</h2>
            <DataDump label="content" data={content} />
            <br />

        </div>
    )
}

const View = IS_DEV_MODE
    ? DebugView
    : Empty;

export default View;
