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
    genre: String,
    score: Number
});

songSchema.pre('save', function(next) {
    // ToDo: add checks if cnt and duration are numbers
    this.score = this.cnt*this.songDuration;
    console.log('pre save hook calculated %s score for this document', this.id);
    next();
})

export const Song = mongoose.model('Music', songSchema);

export const SONGS = [];

export function createRandomSong() {
    return new Song ({
        author: faker.lorem.words(),
        album: faker.lorem.words(),
        song: faker.music.songName(),
        albumArtUrl: faker.image.image(),
        cnt: faker.datatype.number(100),
        songDuration: faker.datatype.number(100),
        genre: faker.music.genre()
    });
}

export async function seedEmptyDatabase() {
    const topSongs = await getTopScoreSongs();
    if (topSongs.length == 0) {
        generateData();
        await saveSongs();
    }
    
}

export function generateData() {
    Array.from({length: faker.datatype.number(100)}).forEach(() => {
        SONGS.push(createRandomSong());
    })
}

export async function saveSongs() {
    if (isDbAlive()) {
        await Song.bulkSave(SONGS);
        console.log('Saved %d songs', SONGS.length);
    }
}

export async function saveSong(song) {
    if (isDbAlive()) {
        await song.save();
        console.log('Song saved %s', song.song);
    }
}

export async function getTopScoreSongs(limit = 10) {
    if (isDbAlive()) {
        return await Song
        .find({})
        .sort({score: -1})
        .limit(limit)
        .exec();
    }
    return [];
}

export async function getSongById(songId) {
    if (isDbAlive()) {
        return await Song.findById(songId).exec();
    }
}

export async function updateTopScoreSong() {
    const topSongs = await getTopScoreSongs();
    const topScoreSong = topSongs[0];
    topScoreSong.cnt += 1;
    console.log("Updated %s song with +1 count", topScoreSong.song);
    await saveSong(topScoreSong);
}

export async function updateSongCnt(song) {
    song.cnt += 1;
    await updateSong(song);
}

export async function updateSong(song) {
    if (isDbAlive()) {
        await song.save();
    }
}

export async function deleteSecondTopSong() {
    const topSongs = await getTopScoreSongs();
    if (topSongs[1]) {
        await deleteSong(topSongs[1]);
    }
}

export async function deleteSongById(songId) {
    await Song.findByIdAndDelete(songId);
}

export async function deleteSong(song) {
    await Song.deleteOne(song);
}