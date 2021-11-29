import React from "react"
import {APP_NAME} from "../../enonic-connection-config";

// fully qualified XP part name:
export const PERSONLIST_PART_NAME = `${APP_NAME}:personList`;

type Props = Record<string, any>;

const PersonsList = ({part, content}: Props) => (
    <>
        <h2>Person: {part?.config?.heading}</h2>
        <pre>{JSON.stringify(content, null, 2)}</pre>
    </>
)

export default PersonsList;
