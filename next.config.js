// neededed to eval inline react scripts
const cspHeaders = [
    {
        key: 'Content-Security-Policy',
        value: `script-src 'self' 'unsafe-eval' 'unsafe-inline';`
    }
]

module.exports = {
    reactStrictMode: true,

    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: cspHeaders,
            },
        ]
    },
}
