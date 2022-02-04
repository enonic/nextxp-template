import {Context} from "../pages/[[...contentPath]]";


/** Import config values from .env, .env.development and .env.production */
const mode = process.env.MODE || process.env.NEXT_PUBLIC_MODE;
export const IS_DEV_MODE = (mode === 'development');


/** Where is XP running */
/** Which site this server communicates with: content item _name for the root site item */
export const SITE = (process.env.SITE || process.env.NEXT_PUBLIC_SITE) as string

/** URL to the guillotine API */
export const CONTENT_API_URL = (process.env.CONTENT_API_URL || process.env.NEXT_PUBLIC_CONTENT_API_URL) as string

/** Optional utility value - defining in one place the name of the target app (the app that defines the content types, the app name is therefore part of the content type strings used both in typeselector and in query introspections) */

export const APP_NAME = (process.env.APP_NAME || process.env.NEXT_PUBLIC_APP_NAME) as string;
/** Optional utility value - derived from APP_NAME, only with underscores instead of dots */

export const APP_NAME_UNDERSCORED = (APP_NAME || '').replace(/\./g, '_')
/** Optional utility value - derived from APP_NAME, only with dashes instead of dots */

export const APP_NAME_DASHED = (APP_NAME || '').replace(/\./g, '-')

/** The domain (full: with protocol and port if necessary) of this next.js server */
export const NEXT_DOMAIN: string = (process.env.NEXT_DOMAIN || process.env.NEXT_PUBLIC_NEXT_DOMAIN) as string


//////////////////////////////////////////////////////////////////////////  Hardcode-able constants

// URI parameter marking that a request is for a preview for CS. MUST MATCH THE VALUE OF 'FROM_XP_PARAM' on XP side.
export const FROM_XP_PARAM = '__fromxp__';
export const COMPONENT_SUBPATH_HEADER = "xp-component-path";
const XP_RENDER_MODE_HEADER = 'content-studio-mode';

export const PORTAL_COMPONENT_ATTRIBUTE = "data-portal-component-type";
export const PORTAL_REGION_ATTRIBUTE = "data-portal-region";

export const FRAGMENT_CONTENTTYPE_NAME = 'portal:fragment';
export const FRAGMENT_DEFAULT_REGION_NAME = 'fragment';

export const PAGE_TEMPLATE_CONTENTTYPE_NAME = 'portal:page-template';

export const SITE_CONTENTTYPE_NAME = 'portal:site';


// ------------------------------- Exports and auxillary functions derived from values above ------------------------------------

export enum XP_REQUEST_TYPE {
    COMPONENT = "component",
    TYPE = "type",
    PAGE = "page",
}

export enum XP_RENDER_MODE {
    INLINE = "inline",
    EDIT = "edit",
    PREVIEW = "preview",
    LIVE = "live",
    ADMIN = "admin",
}

// TODO: Use these instead of hardcoded strings everywhere
export enum XP_COMPONENT_TYPE {
    PART = "part",
    LAYOUT = "layout",
    TEXT = "text",
    FRAGMENT = "fragment",
    PAGE = "page",
}

/** Returns true if the context object (from next.js in [[...contentPath]].jsx ) stems from a request that comes from XP in a CS-preview, i.e. has the URI param FROM_XP_PARAM (defined as '__fromXp__' above).
 *  False if no context, query or FROM_XP_PARAM param */
export const isRequestFromXP = (context?: Context): boolean => {
    return !!getXPRequestType(context);
};

export const getXPRequestType = (context?: Context): XP_REQUEST_TYPE => {
    const headerValue = (context?.req?.headers || {})[FROM_XP_PARAM] as string | undefined;
    const enumValue = XP_REQUEST_TYPE[<keyof typeof XP_REQUEST_TYPE>headerValue?.toUpperCase()];
    return enumValue || XP_REQUEST_TYPE.PAGE;   // need to have some defaults here in case of rendering without XP
}

const getRenderMode = (context?: Context): XP_RENDER_MODE => {
    const value = (context?.req?.headers || {})[XP_RENDER_MODE_HEADER] as string | undefined;
    const enumValue = XP_RENDER_MODE[<keyof typeof XP_RENDER_MODE>value?.toUpperCase()];
    return enumValue || XP_RENDER_MODE.PREVIEW;   // need to have some defaults here in case of rendering without XP
};

const getSingleComponentPath = (context?: Context): string | undefined => (
    (context?.req?.headers || {})[COMPONENT_SUBPATH_HEADER] as string | undefined
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
    isRequestFromXP(context)
        ? xpPath.replace(siteNamePattern, `${NEXT_DOMAIN}/`)     // proxy-relative: should be absolute when served through the proxy
        : xpPath.replace(siteNamePattern, '/')                   // site relative: should just start with slash when served directly
);

/** For '<a href="..."' link values in props when clicking the link should navigate to an XP content item page
 *  and the query returns the XP _path to the target content item:
 *  When viewed directly, the header will have a `<base href='/' />` (see src/pages/_app.tsx), and when viewed through an
 *  XP Content Studio preview, lib-nextjs-proxy will add `<base href='xp/relevant/root/site/url/' />`.
 *  So for content-item links to work in BOTH contexts, the href value should be the path relative to the root site item, not starting with a slash.
 * */
export const getContentLinkUrlFromXpPath = (_path: string): string => _path.replace(siteNamePattern, '')

/**
 * If the request stems from XP (the CS-preview proxy), assets under the /public/ folder needs to have their URL prefixed with the running domain of this next.js server. If not, prefix only with a slash.
 * @param serverRelativeAssetPath Regular next.js asset path
 * @param context nextjs context
 * @returns {string}
 */
export const getPublicAssetUrl = (serverRelativeAssetPath: string, context: Context): string => (
    isRequestFromXP(context)
        ? serverRelativeAssetPath.replace(publicPattern, `${NEXT_DOMAIN}/`)
        : serverRelativeAssetPath.replace(publicPattern, `/`)
);

// ---------------------------------------------------------------------------------------------------------------- Export

const adapterConstants = {
    IS_DEV_MODE,

    NEXT_DOMAIN,
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
    getXPRequestType,
    getSingleComponentPath,
    getRenderMode
};

// Verify required values
const NOT_REQUIRED = ['IS_DEV_MODE'];
Object.keys(adapterConstants).forEach(key => {
    // @ts-ignore
    if (NOT_REQUIRED.indexOf(key) === -1 && !adapterConstants[key]) {
        throw Error(`constants.ts: Config value '${key}' is missing (from .env?)`);
    }
})

export default adapterConstants;
