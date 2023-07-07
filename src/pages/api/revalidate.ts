import {recursiveFetchChildren} from "../[[...contentPath]]";
import {getContentApiUrl} from '@enonic/nextjs-adapter';
import {NextApiRequest, NextApiResponse} from 'next';

interface ResponseData {
    message: string
}

export default async function handler(req: NextApiRequest,
                                      res: NextApiResponse<ResponseData>) {
    const {token, path} = req.query;
    // Check for secret to confirm this is a valid request
    if (token !== process.env.API_TOKEN) {
        // XP hijacks 401 to show login page, so send 407 instead
        return res.status(407).json({message: 'Invalid token'});
    }

    const contentApiUrl = getContentApiUrl({req});

    try {
        // Return 200 immediately and do revalidate in background
        res.status(200).json({message: 'Revalidation started'});
        if (!path) {
            console.info('Started revalidating everything...');
            const paths = await getRevalidatePaths(contentApiUrl);
            const promises = paths.map(item => revalidatePath(res, item.params.contentPath));
            await Promise.all(promises);
            console.info(`Done revalidating everything`);
        } else {
            await revalidatePath(res, path);
            console.info(`Revalidated [${path}]`);
        }
    } catch (err) {
        console.error(`Revalidation [${path ?? 'everything'}] error: ` + err);
    }
}

async function getRevalidatePaths(contentApiUrl: string) {
    return recursiveFetchChildren(contentApiUrl, '\${site}/', 3);
}

async function revalidatePath(res: any, path: string[] | string) {
    let normalPath;
    if (typeof path === 'string') {
        normalPath = path.charAt(0) !== '/' ? '/' + path : path;
    } else {
        normalPath = '/' + path.join('/');
    }
    return res.revalidate(normalPath);
}
