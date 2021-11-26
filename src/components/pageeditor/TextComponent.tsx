import React from "react"

type Props = {
    text: string,
}

const TextComponent = (props: Props) => (
    <>
        <section dangerouslySetInnerHTML={{__html: props.text}}/>
    </>
)

export default TextComponent;
