import React from "react";

import { PORTAL_COMPONENT_ATTRIBUTE } from "../../enonic-connection-config";

import componentSelector from "../../selectors/componentSelector";
import {PageComponent} from "../../selectors/queries/_getMetaData";



export type BaseComponentProps = {
    component: PageComponent,

    content?: any;                  // Content is passed down for optional consumption in componentviews. TODO: Use a react contextprovider instead?
}

const BaseComponent = ({component, content}: BaseComponentProps) => {
    const {type} = component;
    const cmpAttrs: { [key: string]: string } = {
        [PORTAL_COMPONENT_ATTRIBUTE]: type
    };

    // @ts-ignore
    const ComponentView: React = componentSelector[type]?.view || <p>I am a {type}</p>;

    return (
        <div {...cmpAttrs}>
            <ComponentView component={component[component.type]} content={content}/>
        </div>
    )
}
export default BaseComponent;
