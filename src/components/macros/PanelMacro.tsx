import React from 'react'
import {MacroProps} from '@enonic/nextjs-adapter/views/BaseMacro';

import styles from './PanelMacro.module.css';

const PanelMacro = ({name, config, meta}: MacroProps) => {
    // macro is used inside a <p> tag so we can't use any dom tags
    return <>

        <ins className={`${styles.macroPanelStyled} ${getStyleByName(name)}`}>
            <i className={styles.icon}/>
            {[].concat(config.header).map(val => <strong key={val}>{val}</strong>)}
            <output dangerouslySetInnerHTML={{__html: config.body}}/>
        </ins>
    </>
};

function getStyleByName(name: string): string | undefined {
    switch (name) {
    case 'info':
        return styles.macroPanelInfo;
    case 'note':
        return styles.macroPanelNote;
    case 'error':
        return styles.macroPanelError;
    case 'success':
        return styles.macroPanelSuccess;
    default:
        return styles.macroPanelDefault;
    }
}

export default PanelMacro;

