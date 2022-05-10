import React from "react"
import {LinkData} from '../RichTextProcessor';
import {MetaData} from '../guillotine/getMetaData';
import RichTextView from './RichTextView';

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
        <RichTextView data={component.value} mode={meta.renderMode}/>
    </div>
);

export default DefaultTextView;
