import React from "react"
import {APP_NAME} from "../../cmsAdapter/constants";

// fully qualified XP part name:
export const HEADING_PART_NAME = `${APP_NAME}:heading`;

const HeadingView = ({part, content}) => (
    <h2>{part?.config?.heading || content.displayName}</h2>
);

export default HeadingView;