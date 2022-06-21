import React from 'react'
import {RegionView} from '../../_enonicAdapter/views/Region';
import {LayoutProps} from '../../_enonicAdapter/views/BaseLayout';
import styles from './TwoColumnLayout.module.css';

const TwoColumnLayout = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const {common, meta} = props;

    return (
        <>
            <div className={styles.row}>
                <RegionView className="col-sm-6" name="left" components={regions['left']?.components} common={common} meta={meta}/>
                <RegionView className="col-sm-6" name="right" components={regions['right']?.components} common={common} meta={meta}/>
            </div>
        </>
    );
};

export default TwoColumnLayout;
