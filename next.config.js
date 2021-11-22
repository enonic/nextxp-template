var { NEXT_DOMAIN, IS_DEV_MODE } = require('./src/enonic-connection-config');

module.exports = {
    reactStrictMode: true,
    assetPrefix: IS_DEV_MODE ? NEXT_DOMAIN : undefined
}
