import React from "react"
import {RegionView} from '../../cmsAdapter/views/_Region';
import {LayoutProps} from './_Layout';

const ThreeColumnLayoutView = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const {content, meta} = props;

    const leftR = regions['left'];
    const centerR = regions['center'];
    const rightR = regions['right'];

    return (
        <div className="row">
            <RegionView className="col-sm-4" name="left" components={leftR?.components} content={content} meta={meta}/>
            <RegionView className="col-sm-4" name="center" components={centerR?.components} content={content} meta={meta}/>
            <RegionView className="col-sm-4" name="right" components={rightR?.components} content={content} meta={meta}/>
        </div>
    );
};

export default ThreeColumnLayoutView;
