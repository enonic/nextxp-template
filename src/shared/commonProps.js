import {getPublicAssetUrl} from "../enonic-connection-config";

export const getCommonProps = (content, context) => ({
    header: {
        logoUrl: getPublicAssetUrl('images/xp-shield.svg', context),
        title: content?.displayName
    }
});
