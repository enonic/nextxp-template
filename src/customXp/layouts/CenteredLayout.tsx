import React from "react"
import RegionView from '../../xpAdapter/views/_Region';
import {LayoutProps} from './_Layout';
import {APP_NAME} from '../../xpAdapter/enonic-connection-config';

export const CENTERED_LAYOUT_NAME = `${APP_NAME}:layout-centered`;

const CenteredLayoutView = (props: LayoutProps) => {
    const regions = props.layout.regions;

    const centerR = regions ? regions['center'] : undefined;
    return (
        <div className="row">
            {centerR &&
             <RegionView className="col-md-8 col-md-offset-2" name={centerR.name} components={centerR.components} content={props.content}/>}
        </div>
    );
};

export default CenteredLayoutView;
