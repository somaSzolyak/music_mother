import mongoose from "mongoose";
import { faker } from '@faker-js/faker'
import { isDbAlive } from './index.js'

const { Schema } = mongoose;

export const songSchema = new Schema({
    author: String,
    album: String,
    song: String,
    albumArtUrl: String,
    cnt: Number,
    songDuration: Number,
    genre: String
});

export const Song = mongoose.model('Music', songSchema);

export const SONGS = [];

function createRandomSong() {
    return new Song ({
        author: faker.lorem.words(),
        album: faker.lorem.words(),
        song: faker.music.songName(),
        albumArtUrl: faker.image.image(),
        cnt: faker.datatype.number(),
        songDuration: faker.datatype.number(),
        genre: faker.music.genre()
    });
}

export function generateData() {
    Array.from({length: faker.datatype.number(100)}).forEach(() => {
        SONGS.push(createRandomSong());
    })
}

export async function saveSongs() {
    if (isDbAlive()) {
        // SONGS.forEach((song) => console.log(song.author))
        await Song.bulkSave(SONGS);
        console.log('Saved %d songs', SONGS.length);
    }
}