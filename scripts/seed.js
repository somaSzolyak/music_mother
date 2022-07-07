import 'dotenv/config'

import mongoose from 'mongoose';
import { connectMongoose, seedDatabase } from '../models/index.js'

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