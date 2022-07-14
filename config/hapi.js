const path = require('path');
// const { fileURLToPath } = require('url');
const inert = require('@hapi/inert');
const { server: _server }= require('@hapi/hapi');
const { auth, songs } = require('../routes/index.js');

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hapiPort = process.env.HAPI_PORT;
const hapiHost = process.env.HAPI_HOST;
const hapiBaseUri = hapiHost+':'+hapiPort;

const server = _server({
    port: hapiPort,
    host: hapiHost,
    routes: {
        files: {
            relativeTo: path.join(__dirname, '../static')
        }
    }
});

initServer = async () => {
    await server.register(inert);
    server.route([...songs.songRouts, ...auth.authRoutes, ...staticFileRoutes]);
    await server.start();
    console.log('Server running on %s', server.info.uri);
}

stopServer = async () => {
    await server.stop();
    console.log('server stopped');
}

const staticFileRoutes = [
    {
        method: 'GET',
        path: '/favicon.ico',
        handler: (request, h) => {
            return h.file('favicon.ico')
            .code(200)
            .type('image/x-icon');
        }
    }
];

module.exports = {
    server,
    initServer,
    stopServer
}