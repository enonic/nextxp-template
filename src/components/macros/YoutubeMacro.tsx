import React from "react"
import {MacroProps} from '../../_enonicAdapter/views/BaseMacro';

const YoutubeMacro = ({name, config, meta}: MacroProps) => {
    return <iframe width="560" height="315" src={config.url} title={config.title} frameBorder="0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
    </iframe>
};

export default YoutubeMacro;
