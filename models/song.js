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

songSchema.pre('save', calculateScore);
songSchema.pre('updateOne', calculateScore);

function calculateScore (next) {
    // ToDo: add checks if cnt and duration are numbers
    this.score = this.cnt*this.songDuration;
    // console.log('pre hook calculated %s score for this document', this.id);
    next();
}

export const Song = mongoose.model('Music', songSchema);

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

export async function seedDatabase() {
    await saveSongs(generateData());
}

export function generateData() {
    return Array.from({length: faker.datatype.number(100)}).map((song) => {
        song = createRandomSong();
    })
}

export async function saveSongs(songs) {
    await Song.bulkSave(songs);
    console.log('Saved %d songs', songs.length);
}

export async function saveSong(song) {
    await song.save();
    console.log('Song saved %s', song.song);
}

export async function getTopScoreSongs(limit = 10) {
    return await Song
    .find({})
    .sort({score: -1})
    .limit(limit)
    .exec();
}

export async function getSongById(songId) {
    return await Song.findById(songId).exec();
}

export async function updateTopScoreSong() {
    const topSongs = await getTopScoreSongs();
    const topScoreSong = topSongs[0];
    topScoreSong.cnt += 1;
    console.log("Updated %s song with +1 count", topScoreSong.song);
    await saveSong(topScoreSong);
}

export async function updateSongCnt(song) {
    console.log('updateOne');
    await Song.updateOne({_id: song._id}, {$inc : {'cnt' : 1}}).exec();
}

export async function updateSong(song) {
    await song.save();
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