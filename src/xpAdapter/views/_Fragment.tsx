import React from "react"
import BaseComponent from './_BaseComponent';
import {FragmentData, MetaData, PageComponent, PageData} from '../../cms/queries/_getMetaData';
import {FRAGMENT_DEFAULT_REGION_NAME} from '../enonic-connection-config';

interface FragmentProps {
    page?: PageData;
    component?: FragmentData;
    content?: any;
    meta: MetaData;
}

const FragmentView = (props: FragmentProps) => {
    let comps: PageComponent[] = [];
    if (props.page) {
        // rendering whole page
        const regions = props.page.regions || {};
        const regionComps = regions[FRAGMENT_DEFAULT_REGION_NAME]?.components;
        if (regionComps) {
            comps.push(...regionComps);
        }
    } else if (props.component) {
        // rendering a part of a page
        comps.push(...props.component.fragment.components);
    }
    const {content, meta} = props;

    return (
        <>
            {
                comps.map((comp: PageComponent, i: number) => (
                    <BaseComponent key={i} component={comp} content={content} meta={meta}/>
                ))
            }
        </>
    );
};

export default FragmentView;
