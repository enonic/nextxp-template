import React from 'react'
import {APP_NAME, PartData} from '@enonic/nextjs-adapter';

// fully qualified XP part name:
export const HEADING_PART_NAME = `${APP_NAME}:heading`;

export interface HeadingData {
    part: PartData;
    common: any;
}

const HeadingView = ({part, common}: HeadingData) => (
    <h2>{part?.config?.heading || common?.get?.displayName}</h2>
);

export default HeadingView;
