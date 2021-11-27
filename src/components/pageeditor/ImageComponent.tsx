import React from "react"

type Props = {
    image?: {
        caption: string,
        image?: {
            imageUrl: string,
        }
    },
}

const ImageComponent = (props: Props) => (
    <>
        <figure>
            <img alt={props.image?.caption} src={props.image?.image?.imageUrl}/>
        </figure>
    </>
)

export default ImageComponent;
