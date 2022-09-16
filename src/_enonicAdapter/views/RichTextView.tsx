import React from 'react'
import {RichTextProcessor} from '../RichTextProcessor';
import {MetaData, RichTextData} from '../guillotine/getMetaData';
import HTMLReactParser, {DOMNode} from 'html-react-parser';
import {ElementType} from 'domelementtype';
import {Element} from 'domhandler/lib';
import BaseMacro from './BaseMacro';
import {RENDER_MODE} from '../utils';

type Props = {
    data: RichTextData,
    meta: MetaData,
    tag?: string,
    renderMacroInEditMode?: boolean,
}

function replacerFactory(allData: RichTextData, meta: MetaData, renderMacroInEditMode: boolean = true):
    (domNode: DOMNode) => JSX.Element | object | void | undefined | null | false {

    const mode = meta.renderMode;
    // eslint-disable-next-line react/display-name
    return (domNode: DOMNode): JSX.Element | object | void | undefined | null | false => {
        if (domNode.type !== ElementType.Tag) {
            return domNode;
        }

        const el = domNode as Element;
        let ref: string;
        switch (el.tagName) {
            case RichTextProcessor.IMG_TAG:
                ref = el.attribs[RichTextProcessor.IMG_ATTR];
                const src = el.attribs['src'];
                // do not process content images in next to keep it absolute
                if (ref && src && !(mode === RENDER_MODE.NEXT && RichTextProcessor.isContentImage(ref, allData.images))) {
                    el.attribs['src'] = RichTextProcessor.processUrl(src, meta);
                }
                break;
            case RichTextProcessor.LINK_TAG:
                ref = el.attribs[RichTextProcessor.LINK_ATTR];
                const href = el.attribs['href'];
                // do not process media links in next to keep it absolute
                if (ref && href && !(mode === RENDER_MODE.NEXT && RichTextProcessor.isMediaLink(ref, allData.links))) {
                    el.attribs['href'] = RichTextProcessor.processUrl(href, meta);
                }
                break;
            case RichTextProcessor.MACRO_TAG:
                ref = el.attribs[RichTextProcessor.MACRO_ATTR];
                const data = ref && allData.macros.find((d) => d.ref === ref);
                if (data) {
                    return <BaseMacro data={data} meta={meta} renderInEditMode={renderMacroInEditMode}/>
                }
        }
        return el;
    }
}

const RichTextView = ({tag, data, meta, renderMacroInEditMode}: Props) => {
    const CustomTag = tag as keyof JSX.IntrinsicElements || 'section';
    return <CustomTag>
        {data.processedHtml ? HTMLReactParser(data.processedHtml, {replace: replacerFactory(data, meta, renderMacroInEditMode)}) : ''}
    </CustomTag>
}

export default RichTextView;
