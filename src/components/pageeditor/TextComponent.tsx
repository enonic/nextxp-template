import React from "react"

type Props = {
    text: {
        value: {
            processedHtml: string
        }
    }
}

const TextComponent = (props: Props) => (
    <>
        <section dangerouslySetInnerHTML={{__html: props.text.value?.processedHtml}}/>
    </>
)

export default TextComponent;
