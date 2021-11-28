import React from "react"

type Props = Record<string, any>;

export const PERSONS_LIST_PART_NAME = 'personList';

const PersonsList = ({part, content}: Props) => (
    <>
        <h2>{part.config.heading}</h2>
        <pre>{JSON.stringify(content, null, 2)}</pre>
    </>
)

export default PersonsList;
