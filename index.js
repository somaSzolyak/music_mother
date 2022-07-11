import 'dotenv/config'

import { initServer, initDB } from './config/index.js'

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

async function main() {
    try {
        await initDB();
        await initServer();
    } catch(err) {
        console.log(err);
    }
}

main();
