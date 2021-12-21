import React from "react";

type Props = {
    label: string,
    data: any
}

const DataDump = ({label, data}: Props) => (
    (data && (
            <>
                {label && (
                    <h5 style={{marginTop: "0", marginBottom: "0"}}>{label}:</h5>
                )}
                <pre style={{
                    fontSize: ".8em",
                    width: "100%",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word"
                }}>{JSON.stringify(data, null, 2)}</pre>
            </>
        )
    ) || null
);

export default DataDump;


