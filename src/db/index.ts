import { MongoClient } from "mongodb";
import { ApiConfig } from "../../app.config";

export const mongo: any = {};

const dbName = "game-api";
let connecting = false;

export const connectDb = async (url = ApiConfig.DB_URL) => {
  if (mongo.db) {
    return mongo.db;
  }
  if (connecting) {
    return await connectDb(url);
  }
  try {
    console.log("connecting mongo...");
    connecting = true;
    const client = new MongoClient(url);
    await client.connect();
    mongo.client = client;
    mongo.db = client.db(dbName);
    console.log("Mongodb connected to db:", dbName);
    return mongo.db;
  } catch (err) {
    console.error(err);
  } finally {
    connecting = false;
  }
};
