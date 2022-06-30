import { generateData, saveSongs } from "./index.js";
import mongoose from "mongoose";

const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPSW = process.env.MONGO_INITDB_ROOT_PASSWORD;


const DB = mongoose.connection;

export const connectMongoose = async () => {
    await mongoose.connect(
        'mongodb://'+mongoUser+':'+mongoPSW+'@localhost:27017'
        );
    console.log('Connected to mongoDB')
};

export const initMongoose = async () => {
    await connectMongoose();
    generateData();
    await saveSongs();
}

export function isDbAlive() {
    return DB.db != null
}