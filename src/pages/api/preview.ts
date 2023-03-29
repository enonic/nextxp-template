import {JSESSIONID_HEADER, RENDER_MODE_HEADER, XP_BASE_URL_HEADER} from '@enonic/nextjs-adapter';
import {ParsedUrlQuery} from 'querystring';

export default async function handler(req: any, res: any) {
    const {token, path} = req.query;
    if (token !== process.env.API_TOKEN) {
        // XP hijacks 401 to show login page, so send 407 instead
        return res.status(407).json({message: 'Invalid token'});
    }

    // If the slug doesn't exist prevent preview mode from being enabled
    if (path === undefined) {
        return res.status(400).json({message: 'Invalid path'});
    }
    const reqParams = extractParams(req.query, ['token', 'path']);

    console.info(`Previewing [${path}]...`);
    // Enable Preview Mode by setting the cookies
    // getStaticProps will be called in response to this request
    // Do not use previewData because we cache preview token
    // and data in lib-nextjs-proxy across requests
    res.setPreviewData({
        contentPath: path,
        params: reqParams,
        headers: {
            [RENDER_MODE_HEADER]: req.headers[RENDER_MODE_HEADER],
            [XP_BASE_URL_HEADER]: req.headers[XP_BASE_URL_HEADER],
            [JSESSIONID_HEADER]: req.headers[JSESSIONID_HEADER]
        }
    });

    res.redirect(path);
}

function extractParams(query: ParsedUrlQuery, omit: string[]) {
    return Object.entries(query).reduce((prev: Record<string, string>, curr: any) => {
        const [key, val] = curr;
        if (omit.indexOf(key) < 0) {
            prev[key] = val;
        }
        return prev;
    }, {});
}
