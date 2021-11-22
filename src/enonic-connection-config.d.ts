import {Context} from "./pages/[[...contentPath]]";

declare let EnonicConnectionConfig: {
    IS_DEV_MODE: boolean,

    NEXT_DOMAIN: string,
    XP_PREVIEW_ORIGIN: string,

    API_DOMAIN: string,
    SITE: string,
    CONTENT_API_URL: string,

    APP_NAME: string,
    APP_NAME_UNDERSCORED: string,
    APP_NAME_DASHED: string,

    getXpPath: (pageUrl: string) => string,
    getPageUrlFromXpPath: (xpPath: string, context: Context) => string,
    getContentLinkUrlFromXpPath: (xpPath: string, context: Context) => string,
    getPublicAssetUrl: (serverRelativeAssetPath: string, context: Context) => string,
    requestIsFromXp: (context: Context) => boolean
}
export default EnonicConnectionConfig;
