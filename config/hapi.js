import * as path from 'path';
import { fileURLToPath } from 'url';
import * as inert from '@hapi/inert';
import { server as _server } from '@hapi/hapi';
import { songRouts, authRoutes } from '../routes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hapiPort = process.env.HAPI_PORT;
const hapiHost = process.env.HAPI_HOST;
const hapiBaseUri = hapiHost+':'+hapiPort;

export const server = _server({
    port: hapiPort,
    host: hapiHost,
    routes: {
        files: {
            relativeTo: path.join(__dirname, '../static')
        }
    }
});

export const initServer = async () => {
    await server.register(inert);
    server.route([...songRouts, ...authRoutes, ...staticFileRoutes]);
    await server.start();
    console.log('Server running on %s', server.info.uri);
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
