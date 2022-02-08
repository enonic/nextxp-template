import React from "react"
import {LayoutProps} from '../../cmsAdapter/views/_BaseLayout'
import {RegionView} from '../../cmsAdapter/views/_Region';

const FocusLayoutView = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const meta = props.meta;

    return (
        <div className="row boost">
            <RegionView className="col-md-8 col-md-offset-2" 
                name="main" 
                components={regions['main']?.components} 
                content={props.content}
                meta={meta}/>
        </div>
    );
};

export default FocusLayoutView;
