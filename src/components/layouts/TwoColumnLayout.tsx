import React from "react"
import {RegionView} from '../../cmsAdapter/views/_Region';
import {LayoutProps} from '../../cmsAdapter/views/_BaseLayout';

const TwoColumnLayout = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const {content, meta} = props;

    return (
        <>
            <div className="row">
                <RegionView className="col-sm-6" name="left" components={regions['left']?.components} content={content} meta={meta}/>
                <RegionView className="col-sm-6" name="right" components={regions['right']?.components} content={content} meta={meta}/>
            </div>
            <style jsx>{`
                .row {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 10px;
                    flex-wrap: wrap;
                }
                .row :global(div[data-portal-region]) {
                    flex: 1;
                    min-width: 200px;
                }
                .row :global(.xp-page-editor-region-placeholder) {
                    margin-bottom: 0;
                }
            `}</style>
        </>
    );
};

export default TwoColumnLayout;
