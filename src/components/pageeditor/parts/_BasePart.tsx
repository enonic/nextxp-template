import React from "react"

import partSelector from '../../../selectors/partSelector';
import {PartData} from "../../../selectors/queries/_getMetaData";


type Props = {
    part: PartData,

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

const DefaultPart = ({part}: Props) => (
    <div className={`part ${(part.descriptor || "").replace(/[.\-:]/g, "_")}`}
         style={{marginTop:"2rem"}}>
        <h6 style={{marginTop:"0", marginBottom:"0"}}>DefaultPart:</h6>
        <h3 style={{marginTop:"0", marginBottom: "8px"}}>{part.descriptor}</h3>
        <pre style={{fontSize:".8em", width:"100%", whiteSpace:"pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(part.config, null, 2)}</pre>
    </div>
);

type BasePartProps = {
    component?: PartData,
    content?: string
}

const BasePart = (props: BasePartProps) => {
    const {component, content} = props;
    const partSelection = partSelector[component?.descriptor || 0];
    const SelectedPart = partSelection?.page || DefaultPart;
    return <SelectedPart part={{descriptor: component?.descriptor, config: component?.__config__}}
                         content={content}
 />;
}

export default BasePart;
