import React from "react"

import RegionsView from '../../xpAdapter/views/_Region';
import {PageData} from '../queries/_getMetaData';


type Props = {
    content?: any,
    page: PageData | null,
}


const DefaultView = (props: Props) => {

    return (
        <RegionsView regions={props.page?.regions} content={props.content}/>
    )
}

export default DefaultView;
