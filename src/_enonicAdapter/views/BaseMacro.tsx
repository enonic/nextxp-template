import React from "react"
import {MetaData} from "../guillotine/getMetaData";
import {ComponentRegistry} from '../ComponentRegistry';
import {MacroConfig, MacroData} from '../RichTextProcessor';

const unescape = require('unescape');

interface BaseMacroProps {
    data: MacroData;
    meta: MetaData;
}

export interface MacroProps {
    name: string;
    config: MacroConfig;
    meta: MetaData;
}

const BaseMacro = (props: BaseMacroProps) => {
    const {data, meta} = props;

    console.info(`Looking for macro definition for: ${data.descriptor}`)
    const macro = ComponentRegistry.getMacro(data.descriptor);
    const MacroView = macro?.view;
    if (MacroView) {
        const config = data.config[data.name];
        if (config?.body) {
            config.body = unescape(config.body);
        }
        return <MacroView name={data.name} config={config} meta={meta}/>;
    } else if (data.descriptor) {
        console.warn(`BaseMacro: can not render macro '${data.descriptor}': no next view or catch-all defined`);
    }
    return null;
}

export default BaseMacro;
