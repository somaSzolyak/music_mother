const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const { Schema } = mongoose;

const songSchema = new Schema({
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
    next();
}

const Song = mongoose.model('Music', songSchema);

function createRandomSong() {
    return new Song ({
        author: faker.lorem.words(),
        album: faker.lorem.words(),
        song: faker.music.songName(),
        albumArtUrl: faker.image.image(),
        cnt: faker.datatype.number(100),
        songDuration: faker.datatype.number(100),
        genre: faker.music.genre(),
        score: 0
    });
}

const seedDatabase = async () => {
    await saveSongs(generateData());
}

function generateData() {
    return  Array.from({length: faker.datatype.number(2)}).map(song => song = createRandomSong());
}

const saveSongs = async (songs) => {
    await Song.bulkSave(songs);
    console.log('Saved %d songs', songs.length);
}

const saveSong = async (song) => {
    await song.save();
    console.log('Song saved %s', song.song);
}

const getTopScoreSongs = async (limit = 10) => {
    return await Song
    .find({})
    .sort({score: -1})
    .limit(limit)
    .exec();
}

const getSongById = async (songId) => {
    return await Song.findById(songId).exec();
}

const updateTopScoreSong = async () => {
    const topSongs = await getTopScoreSongs();
    const topScoreSong = topSongs[0];
    topScoreSong.cnt += 1;
    console.log("Updated %s song with +1 count", topScoreSong.song);
    await saveSong(topScoreSong);
}

const updateSongCnt = async (song) => {
    console.log('updateOne');
    await Song.updateOne({_id: song._id}, {$inc : {'cnt' : 1}}).exec();
}

const updateSong = async (song) => {
    await song.save();
}

const deleteSecondTopSong = async () => {
    const topSongs = await getTopScoreSongs();
    if (topSongs[1]) {
        await deleteSong(topSongs[1]);
    }
}

const deleteSongById = async (songId) => {
    await Song.findByIdAndDelete(songId);
}

const deleteSong = async (song) => {
    await Song.deleteOne(song);
}

module.exports = {
    songSchema,
    Song,
    seedDatabase,
    generateData,
    saveSongs,
    saveSong,
    getTopScoreSongs,
    getSongById,
    updateTopScoreSong,
    updateSongCnt,
    updateSong,
    deleteSecondTopSong,
    deleteSongById,
    deleteSong
}