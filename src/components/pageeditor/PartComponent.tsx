import React from "react"
import partSelector from '../parts/partSelector';

type Props = {
    part?: {
        descriptor: string,
        configAsJson: Record<string, any>
    },
}

const PartComponent = (props: Props) => {
    const PartView = props.part?.descriptor && partSelector[props.part.descriptor];
    if (PartView) {
        // use defined renderer
        const partData = props.part!.configAsJson;
        return <PartView {...partData}/>
    } else if (props.part?.descriptor) {
        // render default message when no renderer was found for descriptor
        return (
            <>
                <h3>No renderer for {props.part?.descriptor}!</h3>
                <p>Did you forget to add renderer in <em>partSelector.ts</em> file?</p>
                <pre>{JSON.stringify(props, null, 2)}</pre>
            </>
        )
    }
    // empty part is also possible when no descriptor set
    return null;
}

export default PartComponent;
