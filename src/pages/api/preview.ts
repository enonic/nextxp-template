export default async function handler(req: any, res: any) {
    const {token: token, path} = req.query;
    if (token !== process.env.API_TOKEN) {
        return res.status(401).json({message: 'Invalid token'})
    }

    // If the slug doesn't exist prevent preview mode from being enabled
    if (!path) {
        return res.status(400).json({message: 'Invalid path'})
    }

    console.info(`Previewing [${path}]...`);
    // Enable Preview Mode by setting the cookies
    // getStaticProps will be called in response to this request
    // Do not use previewData because we cache preview token
    // and data in lib-nextjs-proxy across requests
    res.setPreviewData({});

    res.redirect(path);
}
