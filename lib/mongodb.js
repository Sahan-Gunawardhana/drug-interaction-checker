import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGO_DB;

if(!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
}

if (!MONGO_DB){
    throw new Error("Define the MONGO_DB environmental variable");
}

let cachedClient = null;
let cachedDb = null;

async function clientPromise() {
    //check the cached
    if(cachedClient && cachedDb){
        return { client: cachedClient, db: cachedDb };
    }

    // set the connection options
    const opts = {  }

    // connect to the cluster
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGO_DB)

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb
    }
}

export default clientPromise;