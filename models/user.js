import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const { Schema } = mongoose;

export const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        requird: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

export const User = mongoose.model('User', userSchema);

export async function register (username, password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    await new User({
        username: username,
        password: hash,
        salt: salt
    }).save();
}

export async function login (username, password) {
    const user = await User.findOne({username: username}).exec();
    const result = await bcrypt.compare(password, user.password);
    return result;
}