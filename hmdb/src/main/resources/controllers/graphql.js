const guillotineLib = require('/lib/guillotine');
const graphqlPlaygroundLib = require('/lib/graphql-playground');
const page = require('./info.js');

//──────────────────────────────────────────────────────────────────────────────
// Constants
//──────────────────────────────────────────────────────────────────────────────
const CORS_HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': '*'
};

//──────────────────────────────────────────────────────────────────────────────
// Methods
//──────────────────────────────────────────────────────────────────────────────
exports.options = function () {
    return {
        contentType: 'text/plain;charset=utf-8',
        headers: CORS_HEADERS
    };
};

exports.get = function (req) {
    if (req.webSocket) {
        return {
            webSocket: {
                data: guillotineLib.createWebSocketData(req),
                subProtocols: ['graphql-ws']
            }
        };
    }

    let body = graphqlPlaygroundLib.render();
    return {
        contentType: 'text/html; charset=utf-8',
        body: body
    };
};

exports.post = function (req) {
    let input = JSON.parse(req.body);

    let params = {
        query: input.query,
        variables: input.variables
    };

    return {
        contentType: 'application/json',
        headers: CORS_HEADERS,
        body: guillotineLib.execute(params)
    };
};

exports.webSocketEvent = guillotineLib.initWebSockets();
