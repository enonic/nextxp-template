import React from "react"
import {APP_NAME} from "../../enonic-connection-config";
import Header from "../../components/blocks/Header";

// fully qualified XP part name:
export const HEADER_PART_NAME = `${APP_NAME}:header`;

type Props = Record<string, any>;

const HeaderPart = ({part, content}: Props) => {
    const { displayName, layoutProps } = content;
    layoutProps.title = part?.config?.title || displayName;

    return <Header {...layoutProps} />
};

export default HeaderPart;
