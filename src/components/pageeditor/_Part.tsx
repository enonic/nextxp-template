import React from "react"

import componentSelector from '../../selectors/componentSelector';

export type PartProps = {
    path: string,
    config?: Record<string, any>,
    descriptor: string,

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

const DefaultPart = ({descriptor, config, path, content}:PartProps) => (
    <div id={`${path}-${descriptor}`} style={{marginTop:"2rem"}}>
        <h6 style={{marginTop:"0", marginBottom:"0"}}>DefaultPart:</h6>
        <h3 style={{marginTop:"0", marginBottom: "8px"}}>{descriptor}</h3>
        <h5 style={{marginTop:"0", marginBottom:"0"}}>config:</h5>
        <pre style={{width:"100%", whiteSpace:"pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(config, null, 2)}</pre>
    </div>
);


const _Part = (props: PartProps) => {
    const componentSelection = componentSelector[props.descriptor];
    const SelectedPart = componentSelection?.page || DefaultPart;
    return <SelectedPart {...props} />;
}

export default _Part;
