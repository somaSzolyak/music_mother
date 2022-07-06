'use strict';
import mongoose from 'mongoose';
import { connectMongoose, seedEmptyDatabase } from '../models/index.js'


async function seed() {
    await connectMongoose();
    await seedEmptyDatabase();
    await mongoose.disconnect();
}

seed();

process.exit();