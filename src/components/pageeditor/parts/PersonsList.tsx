import React from "react"
import {APP_NAME_DASHED} from '../../../enonic-connection-config';

type Props = Record<string, any>;

export const PERSONS_LIST_PART_NAME = 'personList';

const PersonsList = ({component, content}: Props) => {

    const partConfig = (component.configAsJson || {})[APP_NAME_DASHED][PERSONS_LIST_PART_NAME];
    return (
        <>
            <h2>{partConfig.heading}</h2>
            <pre>{JSON.stringify(content, null, 2)}</pre>
        </>
    )
}

export default PersonsList;
