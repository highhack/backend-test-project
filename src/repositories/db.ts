import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv' 
import { Post } from './posts-repository-db';
import { Blog } from './blogs-repository-db';
dotenv.config()

const mongoUri = process.env.MONGO_URL  || "mongodb://0.0.0.0:27017" 
// const mongoUri =  process.env.MONGO_URL 

if (!mongoUri) throw new Error ('url not found')
export const client = new MongoClient(mongoUri)

export const postsCollection = client.db('gerichclub').collection<Post>('posts')
export const blogsCollection = client.db('gerichclub').collection<Blog>('blogs')


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