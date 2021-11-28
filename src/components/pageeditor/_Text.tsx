import React from "react"

type Props = {
    component: {
        value: {
            processedHtml: string
        }
    }
}

const _Text = ({component}: Props) => (
    <section dangerouslySetInnerHTML={{__html: component.value?.processedHtml}}/>
);

export default _Text;
