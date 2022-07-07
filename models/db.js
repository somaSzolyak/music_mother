import mongoose from "mongoose";

// Is this file at the right place? Where should it be?

const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPSW = process.env.MONGO_INITDB_ROOT_PASSWORD;
const isDbLocalHost = process.env.LOCALHOSTDB === 'true';

const DB = mongoose.connection;

export const connectMongoose = async () => {
    const dbHost = isDbLocalHost ? 'localhost' : 'mongodb';
    await mongoose.connect(
        'mongodb://'+mongoUser+':'+mongoPSW+'@'+dbHost+':27017'
        );
    console.log('Connected to mongoDB')
};

export async function initDB () {
    await connectMongoose();
}
