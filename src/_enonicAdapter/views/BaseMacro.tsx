import React from "react"
import {MacroConfig, MacroData, MetaData} from "../guillotine/getMetaData";
import {ComponentRegistry} from '../ComponentRegistry';
import {RENDER_MODE} from '../utils';

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

    const config = data.config[data.name] || {};
    if (config?.body) {
        config.body = unescape(config.body);
    }
    if (meta?.renderMode === RENDER_MODE.EDIT) {
        const attrs = Object.entries(config)
            .filter(entry => entry[0] !== 'body')
            .map(entry => `${entry[0]}="${entry[1]}"`);
        return `[${data.name}${attrs.length ? ` ${attrs.join(' ')}` : ''}${!config.body ? '/]' : `]${config.body}[/${data.name}]`}`
    }

    const macro = ComponentRegistry.getMacro(data.descriptor);
    const MacroView = macro?.view;
    if (MacroView) {
        return <MacroView name={data.name} config={config} meta={meta}/>;
    } else if (data.descriptor) {
        console.warn(`BaseMacro: can not render macro '${data.descriptor}': no next view or catch-all defined`);
    }
    return null;
}

export default BaseMacro;
