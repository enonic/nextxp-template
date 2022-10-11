import {recursiveFetchChildren} from "../[[...contentPath]]";
import {getContentApiUrl} from "../../_enonicAdapter/utils";

export default async function handler(req: any, res: any) {
    const {token, path, revalidateAll} = req.query;
    // Check for secret to confirm this is a valid request
    if (token !== process.env.API_TOKEN) {
        return res.status(401).json({message: 'Invalid token'});
    }

    const contentApiUrl = getContentApiUrl({req});

    try {
        if (revalidateAll) {
            console.info('Started revalidating everything...');
            const paths = await getRevalidatePaths(contentApiUrl);
            const promises = paths.map(item => revalidatePath(res, item.params.contentPath));
            await Promise.all(promises);
            console.info(`Done revalidating everything`);
        } else {
            await revalidatePath(res, path);
            console.info(`Revalidated [${path}]`);
        }
        return res.json({revalidated: true});
    } catch (err) {
        console.error(`Revalidating [${path}] error: ` + err);
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).json({revalidated: false, error: err});
    }
}

async function getRevalidatePaths(contentApiUrl: string) {
    return recursiveFetchChildren(contentApiUrl, '\${site}/', 2);
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
