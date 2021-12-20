import React from "react"

import {IS_DEV_MODE} from "../../xpAdapter/enonic-connection-config";

import RegionsView from '../../xpAdapter/views/_Region';
import {PageData} from '../queries/_getMetaData';


type Props = {
    content?: any,
    page: PageData | null,
}


const DefaultView = IS_DEV_MODE
    ? (props: Props) => {
        const { content } = props;
        return (
            <div style={{padding: "10px"}}>
                <h2>{content.displayName}</h2>
                <h5>content:</h5>
                <pre style={{fontSize: ".8em", width:"100%", whiteSpace:"pre-wrap", wordWrap: "break-word"}}>{JSON.stringify(content, null, 2)}</pre>
                <br />
                <RegionsView regions={props.page?.regions} content={props.content}/>
                <br />
                <p style={{fontSize: ".7em", color: "#bbb"}}>_DefaultView.tsx</p>
            </div>
        )
    }
    : () => <></>;

export default DefaultView;
