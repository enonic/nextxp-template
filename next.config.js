let vercelUrl = process.env.VERCEL_URL;
if (vercelUrl) {
    vercelUrl = 'https://' + vercelUrl;
}
const nextDomain = vercelUrl || process.env.NEXT_DOMAIN;

module.exports = {
    reactStrictMode: true,
    assetPrefix: nextDomain ? nextDomain : undefined,
}
