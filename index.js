'use strict';

import 'dotenv/config'

import { initHapi } from './routes/index.js'
import { initMongoose, updateTopScoreSong } from './models/index.js'
// Are index files a good practice?

// Is there a way to get rid of the await's here?
// I have already waited for the results within these functions
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
