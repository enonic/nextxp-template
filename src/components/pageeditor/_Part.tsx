import React from "react"

import componentSelector from '../../selectors/componentSelector';

type Props = {
    config: Record<string, any>,
}

const DefaultPart = (props:Props) => <pre>Part content {JSON.stringify(props)}</pre>;

const _Part = (props: Props) => componentSelector[props.descriptor] || <DefaultPart {...props} />;

export default _Part;
