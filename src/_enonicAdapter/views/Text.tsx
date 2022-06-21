import React from "react";
import {MetaData, TextData} from '../guillotine/getMetaData';
import RichTextView from './RichTextView';

type Props = {
    meta: MetaData,
    component: TextData,
}

const DefaultTextView = ({component, meta}: Props) => (
    // temporary workaround for TextComponent expecting section inside of a root element
    <div>
        <RichTextView data={component.value} meta={meta}/>
    </div>
);

export default DefaultTextView;
