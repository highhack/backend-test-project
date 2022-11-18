import { MongoClient } from 'mongodb';
import { Blog } from './blogs-repository-db';
// import { Post } from './posts-repository-db';
import * as dotenv from 'dotenv' 
dotenv.config()

// const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017" 
const mongoUri =  process.env.MONGO_URL 

if (!mongoUri) throw new Error ('url not found')
export const client = new MongoClient(mongoUri)

// export const postsCollection = client.db().collection<Post>('posts')
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