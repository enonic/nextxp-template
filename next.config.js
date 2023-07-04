const withTM = require('next-transpile-modules')(['@enonic/nextjs-adapter']);
const withEnonicCache = require('@enonic/nextjs-adapter/server').withEnonicCache;
const i18nConfig = require('./i18n.config');

function getEnonicWebpackConfig(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        // client-side resolution for node modules
        fs: false
    }
    return config;
}

async function getEnonicHeaders() {
    return [
        {
            // Apply these headers to all routes in your application.
            source: '/:path*',
            headers: [
                {
                    key: 'Content-Security-Policy',
                    value: `script-src 'self' 'unsafe-eval' 'unsafe-inline';`
                }
            ],
        },
    ]
}

const config = {
    reactStrictMode: true,
    i18n: i18nConfig.i18n,
    webpack: getEnonicWebpackConfig,
    headers: getEnonicHeaders,
};

module.exports = withTM(withEnonicCache(config));
