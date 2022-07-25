import React from 'react';
import {MetaData, TextData} from '../guillotine/getMetaData';
import RichTextView from './RichTextView';

type Props = {
    meta: MetaData,
    component: TextData,
}

const DefaultTextView = ({component, meta}: Props) => (
    <RichTextView data={component.value} meta={meta}/>
);

export default DefaultTextView;
