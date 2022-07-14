const { server } = require("@hapi/hapi");
const mongoose = require("mongoose");

const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPSW = process.env.MONGO_INITDB_ROOT_PASSWORD;
const isDbLocalHost = process.env.LOCALHOSTDB === 'true';

const DB = mongoose.connection;

const connectMongoose = async () => {
    const dbHost = isDbLocalHost ? 'localhost' : 'mongodb';
    await mongoose.connect(
        'mongodb://'+mongoUser+':'+mongoPSW+'@'+dbHost+':27017'
        );
    console.log('Connected to mongoDB')
};

const initDB = async () => {
    await connectMongoose();
}

const disconnectDB = async () => {
    await DB.close();
}

module.exports = {
    connectMongoose,
    initDB,
    disconnectDB
}
