'use strict';

import mongoose from 'mongoose';
import server from './routes/index.js'

const initDB = async () => {
    await mongoose.connect('mongodb://localhost:27017');
}

const initHapi = async () => {
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

function main() {
    initDB();
    initHapi();
}

main();
