import React from "react"
import {RENDER_MODE} from '../../_enonicAdapter/utils';
import {MacroProps} from '../../_enonicAdapter/views/BaseMacro';

const YoutubeMacro = ({name, config, meta}: MacroProps) => {
    if (meta?.renderMode === RENDER_MODE.EDIT) {
        return <>{`[${name} title="${config.title}" url="${config.url}"/]`}</>
    } else {
        return <>Youtube here</>
    }
};

export default YoutubeMacro;
