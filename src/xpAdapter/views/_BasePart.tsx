import React from "react"

import {PartData} from "../../cms/queries/_getMetaData";
import DefaultPartView from "../../cms/parts/_Part";
import {TypesRegistry} from '../TypesRegistry';


interface BasePartProps {
    component?: PartData;
    content?: any;
}

const BasePart = (props: BasePartProps) => {
    const {component, content} = props;
    let partSelection;
    if (component) {
        partSelection = TypesRegistry.getPart(component.descriptor);
    }
    const SelectedPartView = partSelection?.view || DefaultPartView;
    return <SelectedPartView part={{descriptor: component?.descriptor, config: component?.__config__}}
                             content={content}/>;
}

export default BasePart;
