import React from "react"
import {RichTextProcessor} from '../RichTextProcessor';
import {MetaData} from '../guillotine/getMetaData';

type Props = {
    meta: MetaData,
    component: {
        value: {
            processedHtml: string,
            images: {
                ref: string,
            }[]
        }
    }
}

const DefaultTextView = ({component, meta}: Props) => (
    <section dangerouslySetInnerHTML={{__html: RichTextProcessor.process(component.value, meta.renderMode)}}/>
);

export default DefaultTextView;
