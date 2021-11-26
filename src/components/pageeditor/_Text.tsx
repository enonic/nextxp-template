import React from "react"

type Props = {
    text: string,
}

const _Text = (props: Props) => (
    <>
        <section dangerouslySetInnerHTML={{__html: props.text}}/>
    </>
)

export default _Text;
