'use strict';

import 'dotenv/config'

import { initHapi } from './routes/index.js'
import { initMongoose } from './models/index.js'

async function initDB () {
    await initMongoose();
}

async function initServer () {
    await initHapi();
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

async function main() {
    await initDB();
    await initServer();
}

main();
