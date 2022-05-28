import React from "react"
import {MacroConfig, MacroData, MetaData} from "../guillotine/getMetaData";
import {ComponentRegistry} from '../ComponentRegistry';

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
