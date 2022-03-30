import React from "react"
import {MetaData, PartData} from "../guillotine/getMetaData";
import {ComponentRegistry} from '../ComponentRegistry';
import {RENDER_MODE} from '../utils';
import Empty from './Empty';


export interface PartProps {
    part: PartData;
    data?: any;
    common?: any; // Content is passed down to componentviews. TODO: Use a react contextprovider instead?
    meta: MetaData;
}

interface BasePartProps {
    component?: PartData;
    common?: any;
    data?: any;
    error?: string;
    meta: MetaData;
}

const BasePart = (props: BasePartProps) => {
    const {component, data, common, error, meta} = props;

    if (error) {
        console.warn(`BasePart: '${component?.descriptor}' error: ${error}`);
        return meta.renderMode === RENDER_MODE.EDIT ?
               <ErrorPart reason={error} descriptor={component?.descriptor}/> :
               <Empty/>;
    }

    let partSelection;
    if (component) {
        partSelection = ComponentRegistry.getPart(component.descriptor);
    }
    const SelectedPartView = partSelection?.view;
    if (SelectedPartView) {
        return <SelectedPartView part={component}
                                 data={data}
                                 common={common}
                                 meta={meta}/>;
    } else if (component?.descriptor) {
        // empty descriptor usually means uninitialized part
        console.warn(`BasePart: can not render part '${component.descriptor}': no next view or catch-all defined`);
    }
    return null;
}

export default BasePart;

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

