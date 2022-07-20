export default async function handler(req: any, res: any) {
    const {token: token, path} = req.query;
    if (token !== process.env.API_TOKEN) {
        return res.status(401).json({message: 'Invalid token'})
    }

    // If the slug doesn't exist prevent preview mode from being enabled
    if (!path) {
        return res.status(400).json({message: 'Invalid path'})
    }

    // Enable Preview Mode by setting the cookies
    // getStaticProps will be called in response to this request
    console.info(`Previewing [${path}]...`);
    res.setPreviewData({
        contentPath: path
    }, {
        maxAge: 10  // sec
    });

    res.redirect(path);
}
