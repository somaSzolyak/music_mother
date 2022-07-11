import 'dotenv/config'

import mongoose from 'mongoose';
import { seedDatabase } from '../models/index.js';
import { connectMongoose } from '../config/index.js';

async function seed() {
    console.log("seeding DB")
    try {
        await connectMongoose();
        await seedDatabase();
    } finally {
        await mongoose.disconnect();
    }
}

await seed();

process.exit();