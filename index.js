import 'dotenv/config'

import { initServer } from './routes/index.js'
import { initDB } from './models/index.js'

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

async function main() {
    await initDB();
    await initServer();
}

main();
