import React from "react"

type Props = {
    image: string,
}

const _Image = (props: Props) => (
    <>
        <figure>
            <img alt="" src={props.image}/>
        </figure>
    </>
)

export default _Image;
