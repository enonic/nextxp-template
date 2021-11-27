import React from "react"

type Props = {
    image?: {
        caption: string,
        image?: {
            imageUrl: string,
        }
    },
}

const _Image = (props: Props) => (
    <>
        <figure>
            <img alt={props.image?.caption} src={props.image?.image?.imageUrl}/>
        </figure>
    </>
)

export default _Image;
