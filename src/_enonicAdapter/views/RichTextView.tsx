import React from "react"
import {RENDER_MODE} from '../utils';
import {RichTextProcessor, TextData} from '../RichTextProcessor';

type Props = {
    data: TextData,
    mode?: RENDER_MODE,
    tag?: string,
}

const RichTextView = ({tag, mode, data}: Props) => {
    const CustomTag = tag as keyof JSX.IntrinsicElements || 'section';
    const customMode = mode || RENDER_MODE.NEXT;
    return <CustomTag dangerouslySetInnerHTML={{__html: RichTextProcessor.process(data, customMode)}}/>
}

export default RichTextView;
