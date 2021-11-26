import React from "react"

type Props = {
    config: Record<string, any>,
}

const PartComponent = (props: Props) => (
    <>
        <pre>Part content {JSON.stringify(props)}</pre>
    </>
)

export default PartComponent;
