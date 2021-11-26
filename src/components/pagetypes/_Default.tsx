import React from "react"

import Region, {RegionProps} from "../pageeditor/_Region";

type Props = {
    displayName: string,
    pageAsJson?: {
        regions: RegionProps
    }
}

const DefaultPage = (props: Props) => {
    return (
        <div style={{padding: "10px"}}>
            <h2>{props.displayName}</h2>
            <h5>Props:</h5>
            <pre style={{width:"100%", whiteSpace:"pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(props, null, 2)}</pre>
            <br />
            <Region {...props.pageAsJson} />
            <br />
            <p style={{fontSize: ".7em", color: "#bbb"}}>Renderer: _Default.tsx</p>
        </div>
    )
}

export default DefaultPage;
