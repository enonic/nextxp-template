import {
    COMPONENT_SUBPATH_HEADER,
    FROM_XP_PARAM,
    getContentApiUrl,
    RENDER_MODE_HEADER,
    XP_BASE_URL_HEADER
} from "../../_enonicAdapter/utils";

export default async function handler(req: any, res: any) {
    const {token, path} = req.query;
    if (token !== process.env.API_TOKEN) {
        return res.status(401).json({message: 'Invalid token'})
    }

    // If the slug doesn't exist prevent preview mode from being enabled
    if (!path) {
        return res.status(400).json({message: 'Invalid path'});
    }

    const contentApiUrl = getContentApiUrl({req});

    console.info(`Previewing [${path}]...`);
    // Enable Preview Mode by setting the cookies
    // getStaticProps will be called in response to this request
    // Do not use previewData because we cache preview token
    // and data in lib-nextjs-proxy across requests
    res.setPreviewData({
        contentPath: path,
        headers: {
            [FROM_XP_PARAM]: req.headers[FROM_XP_PARAM],
            [RENDER_MODE_HEADER]: req.headers[RENDER_MODE_HEADER],
            [COMPONENT_SUBPATH_HEADER]: req.headers[COMPONENT_SUBPATH_HEADER],
            [XP_BASE_URL_HEADER]: req.headers[XP_BASE_URL_HEADER],
        }
    });

    res.redirect(path);
}
