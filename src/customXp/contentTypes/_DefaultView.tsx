import React from "react"

import {PageData} from "../../xpAdapter/guillotine/fetchContent";
import {RegionsView} from '../../xpAdapter/views/_Region';

type ContentProps = {
    displayName: string,
}

type Props = {
    content: ContentProps,
    page?: PageData
}


const DefaultView = (props: Props) => {

    return (
        <RegionsView regions={props.page?.regions} content={props.content}/>
    )
}

export default DefaultView;
