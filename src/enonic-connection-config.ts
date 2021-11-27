import {Context} from "./pages/[[...contentPath]]";


/** Import config values from .env, .env.development and .env.production */
const mode = process.env.MODE || process.env.NEXT_PUBLIC_MODE;
export const IS_DEV_MODE = (mode === 'development');


// Where is XP running
export const API_DOMAIN: string = (process.env.API_DOMAIN || process.env.NEXT_PUBLIC_API_DOMAIN) as string

// Which site this server communicates with: content item _name for the root site item
export const SITE: string = (process.env.SITE || process.env.NEXT_PUBLIC_SITE) as string

/** URL to the guillotine API */
export const CONTENT_API_URL: string = (process.env.CONTENT_API_URL || process.env.NEXT_PUBLIC_CONTENT_API_URL) as string

// Optional utility value - defining in one place the name of the target app
// (the app that defines the content types, the app name is therefore part of the content type strings used both in typeselector and in query introspections)
export const APP_NAME: string = (process.env.APP_NAME || process.env.NEXT_PUBLIC_APP_NAME) as string;
export const APP_NAME_UNDERSCORED: string = (APP_NAME || '').replace(/\./g, '_')
export const APP_NAME_DASHED: string = (APP_NAME || '').replace(/\./g, '-')

/** The domain (full: with protocol and port if necessary) of this next.js server */
export const NEXT_DOMAIN: string = (process.env.NEXT_DOMAIN || process.env.NEXT_PUBLIC_NEXT_DOMAIN) as string

/** Where requests from XP CS previews (requesting next renderings) will come from */
export const XP_PREVIEW_ORIGIN: string = (process.env.XP_PREVIEW_ORIGIN || process.env.NEXT_PUBLIC_XP_PREVIEW_ORIGIN) as string


//////////////////////////////////////////////////////////////////////////  Hardcode-able constants

// URI parameter marking that a request is for a preview for CS. MUST MATCH THE VALUE OF 'FROM_XP_PARAM' on XP side.
export const FROM_XP_PARAM = '__fromxp__';
export const COMPONENT_SUBPATH_HEADER = "xp-component-path";
const XP_RENDER_MODE_HEADER = 'content-studio-mode';

export const PORTAL_COMPONENT_ATTRIBUTE = "data-portal-component-type";
export const PORTAL_REGION_ATTRIBUTE = "data-portal-region";

// ------------------------------- Exports and auxillary functions derived from values above ------------------------------------

/** Returns true if the context object (from next.js in [[...contentPath]].jsx ) stems from a request that comes from XP in a CS-preview, i.e. has the URI param FROM_XP_PARAM (defined as '__fromXp__' above).
 *  False if no context, query or FROM_XP_PARAM param */
export const fromXpRequestType = (context?: Context): string|boolean => (
    !!((context?.query || {})[FROM_XP_PARAM]) || ((context?.req?.headers || {})[FROM_XP_PARAM])
);

export enum XP_RENDER_MODE {
    INLINE = "inline",
    EDIT = "edit",
    PREVIEW = "preview",
    LIVE = "live",
    ADMIN = "admin",
}

export const getRenderMode = (context?: Context): XP_RENDER_MODE => {
    const value = (context?.req?.headers || {})[XP_RENDER_MODE_HEADER];
    const enumValue = XP_RENDER_MODE[<keyof typeof XP_RENDER_MODE>value?.toUpperCase()];
    return enumValue || XP_RENDER_MODE.PREVIEW;
};

export const getSingleCompRequest = (context:Context): string|undefined => (
    (context?.req?.headers || {})[COMPONENT_SUBPATH_HEADER]
);

const siteNamePattern = new RegExp('^/' + SITE + "/");
const publicPattern = new RegExp('^/*');

/**
 * Prefix the site-relative content path with the XP site _name and returns a full XP _path string.
 * @param pageUrl {string} The contentPath slug array from [[...contentPath]].tsx, stringified and slash-delimited. Aka. nextjs.side-relative content path.
 * @returns {string} Fully qualified XP content path */
export const getXpPath = (pageUrl: string): string => `/${SITE}/${pageUrl}`;

/** Takes an XP _path string and returns a Next.js-server-ready URL for the corresponding content for that _path */
export const getPageUrlFromXpPath = (xpPath: string, context: Context): string => (
    fromXpRequestType(context)
    ? xpPath.replace(siteNamePattern, `${NEXT_DOMAIN}/`)     // proxy-relative: should be absolute when served through the proxy
    : xpPath.replace(siteNamePattern, '/')                   // site relative: should just start with slash when served directly
);

/** Special-case (for <a href link values in props that target XP content pages - for when links too should work in CS) version of getPageUrlFromXpPath, depending on whether or not the request stems from the XP proxy used for content studio preview, or not */
export const getContentLinkUrlFromXpPath = (xpPath: string, context: Context): string => (
    fromXpRequestType(context)
    ? xpPath.replace(siteNamePattern, '')           // proxy-relative: should not start with a slash when served through the proxy
    : xpPath.replace(siteNamePattern, '/')          // site relative: should start with slash when served directly
);

/**
 * If the request stems from XP (the CS-preview proxy), assets under the /public/ folder needs to have their URL prefixed with the running domain of this next.js server. If not, prefix only with a slash.
 * @param serverRelativeAssetPath Regular next.js asset path
 * @param context nextjs context
 * @returns {string}
 */
export const getPublicAssetUrl = (serverRelativeAssetPath: string, context: Context): string => (
    fromXpRequestType(context)
    ? serverRelativeAssetPath.replace(publicPattern, `${NEXT_DOMAIN}/`)
    : serverRelativeAssetPath.replace(publicPattern, `/`)
);

// ---------------------------------------------------------------------------------------------------------------- Export

const enonicConnectionConfig = {
    IS_DEV_MODE,

    NEXT_DOMAIN,
    XP_PREVIEW_ORIGIN,

    API_DOMAIN,
    SITE,
    CONTENT_API_URL,

    APP_NAME,
    APP_NAME_UNDERSCORED,
    APP_NAME_DASHED,

    FROM_XP_PARAM,
    COMPONENT_SUBPATH_HEADER,
    PORTAL_COMPONENT_ATTRIBUTE,
    PORTAL_REGION_ATTRIBUTE,

    getXpPath,
    getPageUrlFromXpPath,
    getContentLinkUrlFromXpPath,
    getPublicAssetUrl,
    fromXpRequestType
};

// Verify required values
const NOT_REQUIRED = ['IS_DEV_MODE', 'XP_PREVIEW_ORIGIN'];
Object.keys(enonicConnectionConfig).forEach(key => {
    // @ts-ignore
    if (NOT_REQUIRED.indexOf(key) === -1 && !enonicConnectionConfig[key]) {
        throw Error(`enonic-connection-config.ts: Config value '${key}' is missing (from .env?)`);
    }
})

export default enonicConnectionConfig;
