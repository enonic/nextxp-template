import React from "react"

import Region  from "../../xpAdapter/views/_Region";
import {PageData} from "../../xpAdapter/guillotine/fetchContent";

type ContentProps = {
    displayName: string,
}

type Props = {
    content: ContentProps,
    page: PageData
}


const DefaultView = (props: Props) => {
    const { content } = props;
    return (
        <Region {...props} />
    )
}

export default DefaultView;
