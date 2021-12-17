import React from "react"

import {PartData} from "../../cms/queries/_getMetaData";
import {TypesRegistry} from '../TypesRegistry';


interface BasePartProps {
    component?: PartData;
    content?: any;
    data?: any;
}

const BasePart = (props: BasePartProps) => {
    const {component, content, data} = props;
    let partSelection;
    if (component) {
        partSelection = TypesRegistry.getPart(component.descriptor);
    }
    const SelectedPartView = partSelection?.view;
    if (SelectedPartView) {
        return <SelectedPartView part={{descriptor: component?.descriptor, config: component?.__config__}}
                                 data={data}
                                 content={content}/>;
    } else {
        console.log(`BasePart: can not render part '${component?.descriptor}': no next view or catch-all defined`);
        return null;
    }
}

export default BasePart;
