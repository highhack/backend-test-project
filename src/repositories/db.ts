import { MongoClient } from 'mongodb';

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"


export const client = new MongoClient(mongoUri)

export async function runDb() {
    try {
        await client.connect();
        const dbRole = await client.db().command({ ping: 1 });
        console.log(
          `Role of database - Host: ${dbRole.me}  Is primary: ${dbRole.isWritablePrimary}`
        );
      } catch (e) {
        await client.close();
      }
}