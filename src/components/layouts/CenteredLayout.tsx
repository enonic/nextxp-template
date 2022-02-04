import React from "react"
import {RegionView} from '../../cmsAdapter/views/_Region';
import {LayoutProps} from './_Layout';

const CenteredLayoutView = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const meta = props.meta;

    const centerR = regions['center'];
    return (
        <div className="row">
            <RegionView className="col-md-8 col-md-offset-2" name="center" components={centerR?.components} content={props.content}
                        meta={meta}/>
        </div>
    );
};

export default CenteredLayoutView;
