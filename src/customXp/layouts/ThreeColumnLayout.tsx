import React from "react"
import RegionView from '../../xpAdapter/views/_Region';
import {APP_NAME} from '../../xpAdapter/enonic-connection-config';
import {LayoutProps} from './_Layout';

export const THREE_COL_LAYOUT_NAME = `${APP_NAME}:layout-3-col`;

const ThreeColumnLayoutView = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const content = props.content;

    let leftR;
    let centerR
    let rightR;
    if (regions) {
        leftR = regions['left'];
        centerR = regions['center'];
        rightR = regions['right'];
    }
    return (
        <div className="row">
            {leftR && <RegionView className="col-sm-4" name={leftR.name} components={leftR.components} content={content}/>}
            {centerR && <RegionView className="col-sm-4" name={centerR.name} components={centerR.components} content={content}/>}
            {rightR && <RegionView className="col-sm-4" name={rightR.name} components={rightR.components} content={content}/>}
        </div>
    );
};

export default ThreeColumnLayoutView;
