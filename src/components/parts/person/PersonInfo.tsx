import React from "react"
import {APP_NAME} from "../../../cmsAdapter/connection-config";
import {PartProps} from '../_Part';
import {Context} from '../../../pages/[[...contentPath]]';

// fully qualified XP part name:
export const PERSONINFO_PART_NAME = `${APP_NAME}:personInfo`;


const PersonInfo = (props: PartProps) => {
    const {data} = props;
    const displayName = `${data.displayName}`;
    return (
        <main style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem`,
        }}>
            <h2>{props.part?.config?.heading || displayName}</h2>
        </main>
    );
};

export default PersonInfo;

export async function personInfoProcessor(content: any, context?: Context): Promise<any> {
    console.info('personInfoProcessor: start at ' + new Date().toLocaleTimeString());
    await sleep(Math.random() * 3000);
    console.info('personInfoProcessor: end at ' + new Date().toLocaleTimeString())
    return content || {
        displayName: 'Person Info part custom fetched display name'
    };
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
