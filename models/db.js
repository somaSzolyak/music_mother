import mongoose from "mongoose";

// Is this file at the right place? Where should it be?

const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPSW = process.env.MONGO_INITDB_ROOT_PASSWORD;

const DB = mongoose.connection;

export const connectMongoose = async () => {
    await mongoose.connect(
        'mongodb://'+mongoUser+':'+mongoPSW+'@localhost:27017'
        );
    console.log('Connected to mongoDB')
};
export async function initDB () {
    await connectMongoose();
}

export function isDbAlive() {
    return DB.db != null && DB.db != undefined;
}
