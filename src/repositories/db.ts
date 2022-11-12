import { MongoClient } from 'mongodb';
import { Blog } from './blogs-repository-db';
// import { Post } from './posts-repository-db';

// const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017" 
const mongoUri = "mongodb+srv://gerichjs:gg85st88vg63jm63@cluster0.lgwviao.mongodb.net/gerichclub?retryWrites=true&w=majority" 


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