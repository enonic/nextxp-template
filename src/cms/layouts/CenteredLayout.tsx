import React from "react"
import {RegionView} from '../../enonicAdapter/views/_Region';
import {LayoutProps} from './_Layout';
import {APP_NAME} from '../../enonicAdapter/enonic-connection-config';

export const CENTERED_LAYOUT_NAME = `${APP_NAME}:layout-centered`;

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
