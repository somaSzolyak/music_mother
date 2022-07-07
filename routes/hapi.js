import { server as _server } from '@hapi/hapi';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as inert from '@hapi/inert';

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
    await server.start();
    console.log('Server running on %s', server.info.uri);
}

server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: (request, h) => {
        return h.file('favicon.ico')
        .code(200)
        .type('image/x-icon');
    }
})