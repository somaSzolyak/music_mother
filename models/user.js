const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        requird: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

const register = async (username, password) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return await new User({
        username: username,
        password: hash
    }).save();
}

const login = async (username, password) => {
    const user = await User.findOne({username: username}).exec();
    const result = await bcrypt.compare(password, user.password);
    return result ? user : result;
}

const getMe = async (username) => {
    return await User.findOne({username}).exec();
}

const clearUsers = async () => {
    return await User.remove({});
}

module.exports = {
    userSchema,
    User,
    register,
    login,
    getMe,
    clearUsers
}