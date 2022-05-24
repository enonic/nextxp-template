import React from "react"
import {RENDER_MODE} from '../../_enonicAdapter/utils';
import {MacroProps} from '../../_enonicAdapter/views/BaseMacro';
import HTMLReactParser from 'html-react-parser';

const DefaultMacro = ({name, config, meta}: MacroProps) => {
    if (meta?.renderMode === RENDER_MODE.EDIT) {
        return <>{`[${name}]${config.body}[/${name}]`}</>
    } else {
        return HTMLReactParser(config.body) as JSX.Element;
    }
};

export default DefaultMacro;
