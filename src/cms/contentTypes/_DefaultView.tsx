import React from "react"

import RegionsView from '../../xpAdapter/views/_Region';
import {PageData} from '../queries/_getMetaData';

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
