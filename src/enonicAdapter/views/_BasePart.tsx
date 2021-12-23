import React from "react"

import {MetaData, PartData} from "../guillotine/_getMetaData";
import {TypesRegistry} from '../TypesRegistry';


interface BasePartProps {
    component?: PartData;
    content?: any;
    data?: any;
    meta: MetaData;
}

const BasePart = (props: BasePartProps) => {
    const {component, content, data, meta} = props;
    let partSelection;
    if (component) {
        partSelection = TypesRegistry.getPart(component.descriptor);
    }
    const SelectedPartView = partSelection?.view;
    if (SelectedPartView) {
        return <SelectedPartView part={{descriptor: component?.descriptor, config: component?.__config__}}
                                 data={data}
                                 content={content}
                                 meta={meta}/>;
    } else {
        console.log(`BasePart: can not render part '${component?.descriptor}': no next view or catch-all defined`);
        return null;
    }
}

export default BasePart;
