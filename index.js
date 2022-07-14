require('dotenv/config');

const { hapi, db } = require('./config/index.js');

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

async function main() {
    try {
        await db.initDB();
        await hapi.initServer();
    } catch(err) {
        console.log(err);
    }
}

main();
