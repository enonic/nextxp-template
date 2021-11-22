/** Import config values from .env, .env.development and .env.production */

const mode = process.env.MODE || process.env.NEXT_PUBLIC_MODE;
const IS_DEV_MODE = (mode === 'development');


// Where is XP running
const API_DOMAIN = process.env.API_DOMAIN || process.env.NEXT_PUBLIC_API_DOMAIN;

// Which site this server communicates with: content item _name for the root site item
const SITE = process.env.SITE || process.env.NEXT_PUBLIC_SITE;

/** URL to the guillotine API */
const CONTENT_API_URL = process.env.CONTENT_API_URL || process.env.NEXT_PUBLIC_CONTENT_API_URL;

// Optional utility value - defining in one place the name of the target app
// (the app that defines the content types, the app name is therefore part of the content type strings used both in typeselector and in query introspections)
const APP_NAME = process.env.APP_NAME || process.env.NEXT_PUBLIC_APP_NAME;
const APP_NAME_UNDERSCORED=APP_NAME.replace(/\./g, '_');
const APP_NAME_DASHED=APP_NAME.replace(/\./g, '-');

/** The domain (full: with protocol and port if necessary) of this next.js server */
const NEXT_DOMAIN = process.env.NEXT_DOMAIN || process.env.NEXT_PUBLIC_NEXT_DOMAIN;

/** Where requests from XP CS previews (requesting next renderings) will come from */
const XP_PREVIEW_ORIGIN = process.env.XP_PREVIEW_ORIGIN || process.env.NEXT_PUBLIC_XP_PREVIEW_ORIGIN;


//////////////////////////////////////////////////////////////////////////  Hardcode-able constants

// URI parameter marking that a request is for a preview for CS. MUST MATCH THE VALUE OF 'FROM_XP_PARAM' on XP side.
const FROM_XP_PARAM = '__fromxp__';





// ------------------------------- Exports and auxillary functions derived from values above ------------------------------------

/** Returns true if the context object (from next.js in [[...contentPath]].jsx ) stems from a request that comes from XP in a CS-preview, i.e. has the URI param FROM_XP_PARAM (defined as '__fromXp__' above).
 *  False if no context, query or FROM_XP_PARAM param */
const requestIsFromXp = (context) => {
    return !!((context?.query || {})[FROM_XP_PARAM]) || !!((context?.req?.headers || {})[FROM_XP_PARAM])
}

const siteNamePattern = new RegExp('^/' + SITE + "/");
const publicPattern = new RegExp('^/*');

module.exports = {
    IS_DEV_MODE,

    NEXT_DOMAIN,
    XP_PREVIEW_ORIGIN,

    API_DOMAIN,
    SITE,
    CONTENT_API_URL,

    APP_NAME,
    APP_NAME_UNDERSCORED,
    APP_NAME_DASHED,


    /**
     * Prefix the site-relative content path with the XP site _name and returns a full XP _path string.
     * @param pageUrl {string} The contentPath slug array from [[...contentPath]].tsx, stringified and slash-delimited. Aka. nextjs.side-relative content path.
     * @returns {string} Fully qualified XP content path */
    getXpPath: (pageUrl) => `/${SITE}/${pageUrl}`,

    /** Takes an XP _path string and returns a Next.js-server-ready URL for the corresponding content for that _path */
    getPageUrlFromXpPath: (xpPath, context) => requestIsFromXp(context)
        ? xpPath.replace(siteNamePattern, `${NEXT_DOMAIN}/`)     // proxy-relative: should be absolute when served through the proxy
        : xpPath.replace(siteNamePattern, '/'),                 // site relative: should just start with slash when served directly

    /** Special-case (for <a href link values in props that target XP content pages - for when links too should work in CS) version of getPageUrlFromXpPath, depending on whether or not the request stems from the XP proxy used for content studio preview, or not */
    getContentLinkUrlFromXpPath: (xpPath, context) => requestIsFromXp(context)
        ? xpPath.replace(siteNamePattern, '')           // proxy-relative: should not start with a slash when served through the proxy
        : xpPath.replace(siteNamePattern, '/'),         // site relative: should start with slash when served directly

    /**
     * If the request stems from XP (the CS-preview proxy), assets under the /public/ folder needs to have their URL prefixed with the running domain of this next.js server. If not, prefix only with a slash.
     * @param serverRelativeAssetPath Regular next.js asset path
     * @param context nextjs context
     * @returns {string}
     */
    getPublicAssetUrl: (serverRelativeAssetPath, context) => requestIsFromXp(context)
        ? serverRelativeAssetPath.replace(publicPattern, `${NEXT_DOMAIN}/`)
        : serverRelativeAssetPath.replace(publicPattern, `/`),

    /** Returns true if the context object from next.js stems from a request that comes from XP in a CS-preview, i.e. has the URI param FROM_XP_PARAM (value above) */
    requestIsFromXp
};

