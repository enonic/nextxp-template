import React from "react"

type Props = {
    displayName: string,
}

const DefaultPage = (props: Props) => {
    return (
        <div style={{padding: "10px"}}>
            <h2>{props.displayName}</h2>
            <h5>Props:</h5>
            <pre style={{width:"100%", whiteSpace:"pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(props, null, 2)}</pre>
            <br />
            <p style={{fontSize: ".7em", color: "#bbb"}}>Renderer: _Default.tsx</p>
        </div>
    )
}

export default DefaultPage;
