'use strict';

import { server as _server } from '@hapi/hapi';
import mongoose from 'mongoose';

const init = async () => {

    const server = _server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

const { Schema } = mongoose;

const musicSchema = new Schema({
    band: String,
    album: String,
    song: String,
    albumArtUrl: String,
    cnt: Number,
    songDuration: Number
});

const Music = mongoose.model('Music', musicSchema);

async function main() {
    await mongoose.connect('mongodb://localhost:27017');
    init();
}

await main();
