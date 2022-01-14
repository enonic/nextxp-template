import React from "react";

import {IS_DEV_MODE} from "../../enonicAdapter/enonic-connection-config";

import {MetaData, PageData} from "../../enonicAdapter/guillotine/_getMetaData";
import DataDump from "../../enonicAdapter/views/DataDump";
import Empty from "../../enonicAdapter/views/Empty";

export interface PageProps {
    page: PageData;
    content: any;
    meta: MetaData;
}

const DefaultPageViewDev = (props: PageProps) => {
    const desc = props.page.descriptor;
    return (
        <div className={`page ${desc.replace(/[.\-:]/g, "_")}`}
             style={{marginTop: "2rem"}}>

            <h6 style={{fontSize: ".7em", fontWeight: "normal", color: "#bbb", marginTop: "0", marginBottom: "0"}}>_Page.tsx:</h6>
            <h3 style={{marginTop: "0", marginBottom: "8px"}}>{desc}</h3>

            <DataDump label="page" data={props.page}/>
        </div>);
}

const DefaultPageView = IS_DEV_MODE
                        ? DefaultPageViewDev
                        : Empty;

export default DefaultPageView;
