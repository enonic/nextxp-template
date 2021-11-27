import React from "react"

type Props = {
    text: {
        value: {
            processedHtml: string
        }
    }
}

const _Text = (props: Props) => (
    <>
        <section dangerouslySetInnerHTML={{__html: props.text.value?.processedHtml}}/>
    </>
)

export default _Text;
