import React from "react"

import {MetaData, PartData} from "../guillotine/_getMetaData";
import {TypesRegistry} from '../TypesRegistry';
import {XP_RENDER_MODE} from '../connection-config';
import Empty from './Empty';


interface BasePartProps {
    component?: PartData;
    content?: any;
    data?: any;
    error?: string;
    meta: MetaData;
}

const BasePart = (props: BasePartProps) => {
    const {component, content, data, error, meta} = props;

    if (error) {
        console.warn(`BasePart: '${component?.descriptor}' error: ${error}`);
        return meta.renderMode === XP_RENDER_MODE.EDIT ?
               <ErrorPart reason={error} descriptor={component?.descriptor}/> :
               <Empty/>;
    }

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
        console.warn(`BasePart: can not render part '${component?.descriptor}': no next view or catch-all defined`);
        return null;
    }
}

export const ErrorPart = ({descriptor, reason}: { descriptor?: string, reason: string }) => {
    return (
        <div style={{
            border: "2px solid red",
            padding: '16px',
        }}>
            <h3 style={{margin: 0}}>Part error: {descriptor}</h3>
            <pre style={{marginBottom: 0}}>{reason ? reason : 'Unknown error'}</pre>
        </div>
    )
}

export default BasePart;
