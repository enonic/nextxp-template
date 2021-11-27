import React from "react"

import partSelector from '../../../selectors/partSelector';

export type PartData = {
    descriptor: string,
    [customKeysFromQuery:string]: any
}

type Props = {
    component: PartData,

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

const DefaultPart = ({component}: Props) => (
    <div className={`part ${component.descriptor.replace(/[.\-:]/g, "_")}`}
         style={{marginTop:"2rem"}}>
        <h6 style={{marginTop:"0", marginBottom:"0"}}>DefaultPart:</h6>
        <h3 style={{marginTop:"0", marginBottom: "8px"}}>{component.descriptor}</h3>
        <pre style={{fontSize:".8em", width:"100%", whiteSpace:"pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(component, null, 2)}</pre>
    </div>
);


const BasePart = (props: Props) => {
    const {component} = props;
    const partSelection = partSelector[component.descriptor];
    const SelectedPart = partSelection?.page || DefaultPart;
    return <SelectedPart {...props} />;
}

export default BasePart;
