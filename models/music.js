import mongoose from "mongoose";

const { Schema } = mongoose;

export const musicSchema = new Schema({
    author: String,
    album: String,
    song: String,
    albumArtUrl: String,
    cnt: Number,
    songDuration: Number
});

export const musicModel = mongoose.model('Music', musicSchema);

export const connectMongoose = async () => {
    await mongoose.connect('mongodb://localhost:27017');
};