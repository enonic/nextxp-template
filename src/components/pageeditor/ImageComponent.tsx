import React from "react"

type Props = {
    image: string,
}

const ImageComponent = (props: Props) => (
    <>
        <figure>
            <img alt="" src={props.image}/>
        </figure>
    </>
)

export default ImageComponent;
