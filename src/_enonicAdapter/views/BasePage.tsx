import React from "react"
import {ComponentRegistry} from '../ComponentRegistry';
import {MetaData, PageData} from "../guillotine/getMetaData";
import {XP_COMPONENT_TYPE} from '../utils';
import {MissingComponent, shouldShowMissingView} from './BaseComponent';

export interface PageProps {
    page: PageData;
    data?: any;
    common?: any; // Content is passed down to componentviews. TODO: Use a react contextprovider instead?
    meta: MetaData;
}

export interface BasePageProps {
    component?: PageData;
    common?: any;
    data?: any;
    error?: string;
    meta: MetaData;
}

const BasePage = (props: BasePageProps) => {
    const {component, data, common, error, meta} = props;
    const desc = component?.descriptor;
    if (error) {
        console.warn(`BasePage: '${desc}' error: ${error}`);
        return null;    //TODO: create page error view
    }
    let pageDef;
    if (desc) {
        pageDef = ComponentRegistry.getPage(desc);
    }
    const PageView = pageDef?.view;
    if (PageView) {
        return <PageView page={component}
                         data={data}
                         common={common}
                         meta={meta}/>;
    } else if (component?.descriptor) {
        // empty descriptor usually means uninitialized page
        console.warn(`BasePage: can not render page '${desc}': no next view or catch-all defined`);
        if (shouldShowMissingView(meta)) {
            return <MissingComponent type={XP_COMPONENT_TYPE.PAGE} descriptor={component.descriptor}/>
        }
    }
    return null;
}

export default BasePage;
