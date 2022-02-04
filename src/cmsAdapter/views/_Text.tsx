import React from "react"

type Props = {
    component: {
        value: {
            processedHtml: string
        }
    }
}

const DefaultTextView = ({component}: Props) => (
    <section dangerouslySetInnerHTML={{__html: component.value?.processedHtml}}/>
);

export default DefaultTextView;
