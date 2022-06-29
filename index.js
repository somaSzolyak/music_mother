'use strict';

import { server } from './routes/index.js'
import { connectMongoose } from './models/index.js'

async function connectDB () {
    await connectMongoose();
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
    connectDB();
    initHapi();
}

main();
