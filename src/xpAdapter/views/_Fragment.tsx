import React from "react"
import BaseComponent from './_BaseComponent';
import {FragmentData, PageComponent} from '../../cms/queries/_getMetaData';

export const FRAGMENT_CONTENTTYPE_NAME = 'portal:fragment';

export const FRAGMENT_DEFAULT_REGION_NAME = 'fragment';

interface FragmentProps {
    component?: FragmentData;
    content?: any;
}

const FragmentView = (props: FragmentProps) => {

    const comps = props.component?.fragment.components || [];
    const content = props.content;

    return (
        <>
            {
                comps.map((comp: PageComponent, i: number) => (
                    <BaseComponent key={i} component={comp} content={content}/>
                ))
            }
        </>
    );
};

export default FragmentView;
