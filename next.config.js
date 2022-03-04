let nextDomain = process.env.NEXT_DOMAIN || process.env.NEXT_PUBLIC_NEXT_DOMAIN;
if (!nextDomain) {
    let vercelUrl = process.env.VERCEL_URL;
    if (vercelUrl) {
        nextDomain = 'https://' + vercelUrl;
    }
}

module.exports = {
    reactStrictMode: true,
    assetPrefix: nextDomain,
}
