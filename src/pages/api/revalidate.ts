export default async function handler(req: any, res: any) {
    // Check for secret to confirm this is a valid request
    if (req.query.token !== process.env.API_TOKEN) {
        return res.status(401).json({message: 'Invalid token'});
    }

    const path = req.query.path || '';
    console.info(`Revalidating [${path}]...`);
    try {
        await res.revalidate(path);
        console.info(`Revalidating [${path}] done`);
        return res.json({revalidated: true});
    } catch (err) {
        console.error(`Revalidating [${path}] error: ` + JSON.stringify(err));
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
}
