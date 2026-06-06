import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod: MongoMemoryServer;

export async function setup() {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
}

export async function teardown() {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongod.stop();
}

export async function clearDB() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key]!.deleteMany({});
    }
}
