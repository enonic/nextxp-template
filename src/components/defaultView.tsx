import React from "react"
import {PageData} from '../cmsAdapter/guillotine/_getMetaData';
import DataDump from "../cmsAdapter/views/DataDump";

type Props = {
    content?: any,
    page: PageData | null,
}

const DefaultView = ({content, page}: Props) => {
    return (
        <div style={{padding: "10px"}}>
            <h2>{content.displayName}</h2>
            <DataDump label="content" data={content} />
            <br />
            <p style={{fontSize: ".7em", color: "#bbb"}}>_DefaultView.tsx</p>
        </div>
    )
}

export default DefaultView;
