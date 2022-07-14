const { song } = require('../models/index.js');

const { Song } = song;

module.exports.songRouts = [
    {
        method: 'POST',
        path: '/songs',
        handler: async (request, h) => {
            // todo: check body
            const song = new Song(request.payload);
            await song.saveSong(song);
            return h.response({'message': 'created'}).code(201);
        }
    },
    {
        method: 'PUT',
        path: '/songs',
        handler: async (request, h) => {
            console.log(request.payload._id);
            if (request.payload._id) {
                const newSong = new Song(request.payload);
                await song.updateSongCnt(newSong);
                return h.response({'messsage': 'updated'}).code(200);
            }
            return h.response({'messsage': 'unsuccessfull update'}).code(400);
        }
    },
    {
        method: 'GET',
        path: '/songs',
        handler: async (request, h) => {
            return h.response({"message": await song.getTopScoreSongs()}).code(200);
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
            await song.deleteSongById(request.params.songId);
            return h.response( {'messsage': 'deleted '+request.params.songId}).code(200);
        }
    }
];
