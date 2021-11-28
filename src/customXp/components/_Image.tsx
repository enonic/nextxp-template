import React from "react"

type Props = {
    component: {
        caption?: string,
        image?: {
            imageUrl: string,
        }
    },

    content?: any
}

const DefaultImageView = ({component}: Props) => {
    return <figure>
        <img alt={component.caption}
             src={component.image?.imageUrl}/>
    </figure>
}

export default DefaultImageView;
