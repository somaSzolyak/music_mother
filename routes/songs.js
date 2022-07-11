import { getTopScoreSongs, saveSong, deleteSongById, updateSongCnt, Song } from '../models/index.js';

export const songRouts = [
    {
        method: 'POST',
        path: '/songs',
        handler: async (request, h) => {
            // todo: check body
            const song = new Song(request.payload);
            await saveSong(song);
            return h.response({'message': 'created'}).code(201);
        }
    },
    {
        method: 'PUT',
        path: '/songs',
        handler: async (request, h) => {
            console.log(request.payload._id);
            if (request.payload._id) {
                const song = new Song(request.payload);
                await updateSongCnt(song);
                return h.response({'messsage': 'updated'}).code(200);
            }
            return h.response({'messsage': 'unsuccessfull update'}).code(400);
        }
    },
    {
        method: 'GET',
        path: '/songs',
        handler: async (request, h) => {
            return h.response({"message": await getTopScoreSongs()}).code(200);
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return h.redirect("/songs");
        }
    },
    {
        method: 'DELETE',
        path: '/{songId}',
        handler: async (request, h) => {
            await deleteSongById(request.params.songId);
            return h.response( {'messsage': 'deleted '+request.params.songId}).code(200);
        }
    }
];
