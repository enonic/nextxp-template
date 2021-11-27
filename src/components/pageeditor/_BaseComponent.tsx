import React from "react";

import { PORTAL_COMPONENT_ATTRIBUTE } from "../../enonic-connection-config";

import _Text from "./_Text";
import _Part, {PartI} from "./_Part";
import _Image from "./_Image";

const componentTypeSelector = {
    'text': _Text,
    'part': _Part,
    'image': _Image
};



export interface BaseComponentI {
    type: string;
    path: string;
    text?: string;
    image?: string;
    part?: PartI
}

type Props = {
    component: BaseComponentI,

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

const BaseComponent = ({component, content}: Props) => {
    const {type} = component;
    const cmpAttrs: { [key: string]: string } = {
        [PORTAL_COMPONENT_ATTRIBUTE]: type
    };

    const ComponentView = componentTypeSelector[type] || <p>I am a {type}</p>;

    return (
        <div {...cmpAttrs}>
            <ComponentView component={component[component.type]} content={content}/>
        </div>
    )
}
export default BaseComponent;
