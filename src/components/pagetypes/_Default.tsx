import React from "react"

import Region, {PageProps} from "../pageeditor/_Region";

type ContentProps = {
    displayName: string,
}

type Props = {
    content: ContentProps,
    page?: PageProps
}


const DefaultPage = (props: Props) => {
    const { content } = props;
    return (
        <div style={{padding: "10px"}}>
            <h2>{content.displayName}</h2>
            <h5>content:</h5>
            <pre style={{width:"100%", whiteSpace:"pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(content, null, 2)}</pre>
            <br />
            <Region {...props} />
            <br />
            <p style={{fontSize: ".7em", color: "#bbb"}}>Renderer: _Default.tsx</p>
        </div>
    )
}

export default DefaultPage;
