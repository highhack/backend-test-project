import { postsCollection } from "../db";

export interface Post {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
    _id?: string;
  }




export const postsRepository = {
async deleteAllPosts(): Promise<Post[]> {
   postsCollection.deleteMany({})
    return postsCollection.find({}).toArray() || 0
},

async getTotalCount(id: string): Promise<number> {
  return  await postsCollection.find({id: id}).count() || 0
 },

async getAllPosts(): Promise<Post[]> {
  return postsCollection.find({}, { projection: { _id: 0 } }).toArray()
},

async createPost(body: {title: string, shortDescription: string, content: string, blogId: string}): Promise<Post> {

    const {title, shortDescription, content, blogId} = body 
      const post = {
        "id": new Date().getTime().toString(),
        "title": title,
        "shortDescription": shortDescription,
        "content": content,
        "blogId": blogId,
        "blogName": 'blogName',
        "createdAt": new Date().toISOString(),
      }
      await postsCollection.insertOne(post)
      return post
},

 findPost: async (id: string) => {
 return await postsCollection.findOne({id: id}, { projection: { _id: 0 } }) || undefined
},

 findPostsByBlogID: async (blogId: string, queries?: any) =>  {
  const {pageNumber, pageSize, sortBy, sortDirection} = queries
  const posts = await postsCollection.find({blogId: blogId}, { projection: { _id: 0 } })
  .sort({[sortBy]: sortDirection})
  .skip((pageNumber - 1) * pageSize )
  .limit(pageSize)
  .toArray() || null
  return posts
},

updatePost: async (
    body: {title: string, shortDescription: string, content: string, blogId: string},
    postId: string
    ) => {
        const {title, shortDescription, content, blogId} = body 
          const result =await postsCollection.updateOne({id: postId}, {$set: 
            {
              title: title, 
              shortDescription: shortDescription, 
              content:content, 
              blogId: blogId,
            }})
            return result.matchedCount === 1
},

removePost: async (id: string) => {
  const result = await postsCollection.deleteOne({id:id})
  return result.deletedCount === 1
}
}