import { server as _server } from '@hapi/hapi';
import { getTopScoreSongs, saveSong, deleteSongById, getSongById, updateSongCnt, Song } from '../models/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import * as inert from '@hapi/inert';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

server.route({
    method: 'POST',
    path: '/songs',
    handler: async (request, h) => {
        // todo: check body
        const song = new Song(request.payload);
        await saveSong(song);
        return h.response('created').code(201);
    }
})


server.route({
    method: 'PUT',
    path: '/songs',
    handler: async (request, h) => {
        console.log(request.payload._id);
        const song = new Song(request.payload);
        await updateSongCnt(song);
        return h.response({'messsage': 'updated'}).code(200);
    }
});

server.route({
    method: 'GET',
    path: '/songs',
    handler: async (request, h) => {
        return h.response({"message": await getTopScoreSongs()}).code(200);
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        return h.redirect("/songs");
    }
});

server.route({
    method: 'DELETE',
    path: '/{songId}',
    handler: async (request, h) => {
        await deleteSongById(request.params.songId);
        return h.response( {'messsage': 'deleted '+request.params.songId}).code(200);
    }
});
