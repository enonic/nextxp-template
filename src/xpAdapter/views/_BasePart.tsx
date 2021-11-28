import React from "react"

import partSelector from '../../customXp/parts/partSelector';
import {PartData} from "../../customXp/queries/_getMetaData";
import DefaultPartView from "../../customXp/parts/_Part";



type BasePartProps = {
    component?: PartData,
    content?: string
}

const BasePart = (props: BasePartProps) => {
    const {component, content} = props;
    const partSelection = partSelector[component?.descriptor || 0];
    const SelectedPartView = partSelection?.view || DefaultPartView;
    return <SelectedPartView part={{descriptor: component?.descriptor, config: component?.__config__}}
                         content={content}
 />;
}

export default BasePart;
