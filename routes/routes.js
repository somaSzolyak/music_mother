import { server as _server } from '@hapi/hapi';
import { getTopScoreSongs, createRandomSong, saveSong, deleteSongById } from '../models/index.js';

export const server = _server({
    port: 3000,
    host: 'localhost'
});

export const initHapi = async () => {
    await server.start();
    console.log('Server running on %s', server.info.uri);
}

// server.route({
//     method: 'GET',
//     path: '/favicon.ico',
//     handler: (request, h) => {
//         return;
//     }
// })


server.route({
    method: 'PUT',
    path: '/',
    handler: async (request, h) => {
        console.log(request.payload);
        await saveSong(createRandomSong());
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        return await getTopScoreSongs();
    }
});

server.route({
    method: 'DELETE',
    path: '/{songId}',
    handler: async (request, h) => {
        await deleteSongById(request.params.songId);
    }
});