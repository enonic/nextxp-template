import React from "react"
import {APP_NAME} from "../../_enonicAdapter/utils";
import {PartData} from '../../_enonicAdapter/guillotine/getMetaData';

// fully qualified XP part name:
export const HEADING_PART_NAME = `${APP_NAME}:heading`;

export interface HeadingData {
    part: PartData;
    content: any;
}

const HeadingView = ({part, content}: HeadingData) => (
    <h2>{part?.config?.heading || content.displayName}</h2>
);

export default HeadingView;
