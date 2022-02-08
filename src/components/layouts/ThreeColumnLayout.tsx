import React from "react"
import {RegionView} from '../../cmsAdapter/views/_Region';
import {LayoutProps} from '../../cmsAdapter/views/_BaseLayout';

const ThreeColumnLayoutView = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const {content, meta} = props;

    return (
        <div className="row">
            <RegionView className="col-sm-4" name="left" components={regions['left']?.components} content={content} meta={meta}/>
            <RegionView className="col-sm-4" name="center" components={regions['center']?.components} content={content} meta={meta}/>
            <RegionView className="col-sm-4" name="right" components={regions['right']?.components} content={content} meta={meta}/>
        </div>
    );
};

export default ThreeColumnLayoutView;
