import React from "react"
import {LinkData, RichTextProcessor} from '../RichTextProcessor';
import {MetaData} from '../guillotine/getMetaData';

type Props = {
    meta: MetaData,
    component: {
        value: {
            processedHtml: string,
            links: LinkData[]
        }
    }
}

const DefaultTextView = ({component, meta}: Props) => (
    // temporary workaround for TextComponent expecting section inside of a root element
    <div>
        <section dangerouslySetInnerHTML={{__html: RichTextProcessor.process(component.value, meta.renderMode)}}/>
    </div>
);

export default DefaultTextView;
