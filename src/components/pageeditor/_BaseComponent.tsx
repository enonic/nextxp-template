import React from "react";

import { PORTAL_COMPONENT_ATTRIBUTE } from "../../enonic-connection-config";
import {PartData} from "./parts/_BasePart";
import componentSelector from "../../selectors/componentSelector";



export interface BaseComponentData {
    type: string;
    path: string;
    text?: string;
    image?: string;
    part?: PartData
}

type Props = {
    component: BaseComponentData,

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

const BaseComponent = ({component, content}: Props) => {
    const {type} = component;
    const cmpAttrs: { [key: string]: string } = {
        [PORTAL_COMPONENT_ATTRIBUTE]: type
    };

    const ComponentView = componentSelector[type]?.page || <p>I am a {type}</p>;

    return (
        <div {...cmpAttrs}>
            <ComponentView component={component[component.type]} content={content}/>
        </div>
    )
}
export default BaseComponent;
