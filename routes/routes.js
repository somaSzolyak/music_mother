import { server as _server } from '@hapi/hapi';

export const server = _server({
    port: 3000,
    host: 'localhost'
});

export const initHapi = async () => {
    await server.start();
    console.log('Server running on %s', server.info.uri);
}

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello World!';
    }
});

// would it make a difference if I were to export server here
// after the GET route is added
// export server;
