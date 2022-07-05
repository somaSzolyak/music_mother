import { server as _server } from '@hapi/hapi';
import { getTopScoreSongs, saveSong, deleteSongById, getSongById, updateSongCnt, Song } from '../models/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import * as inert from '@hapi/inert';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const server = _server({
    port: 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, '..')
        }
    }
});

export const initHapi = async () => {
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


server.route({
    method: 'PUT',
    path: '/',
    handler: async (request, h) => {
        console.log(request.payload._id);
        let song = await getSongById(request.payload._id);
        if (song) {
            await updateSongCnt(song)
            return h.response('updated').code(200);
        }
        // todo: check body
        song = new Song(request.payload);
        await saveSong(song);
        return h.response('created').code(201);
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
        return h.response('deleted '+request.params.songId).code(200);
    }
});
