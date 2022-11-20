import { FindOptions } from "mongodb";
import {  blogsCollection } from "./db";

export interface Blog {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
  }
  

export const blogsRepository = {
async deleteAllBlogs(): Promise<Blog[]> {
  blogsCollection.deleteMany({})
    return blogsCollection.find({}).toArray()
},
async getAllBlogs(): Promise<Blog[]> {
   return blogsCollection.find({ }, { projection: { _id: 0 } }).toArray()
},
async createBlog(body: {name: string; description: string; websiteUrl: string}): Promise<Blog>{

    const {name, description, websiteUrl} = body 
      const blog = {
        "id": new Date().getTime().toString(),
        "name": name,
        "description": description,
        "websiteUrl": websiteUrl,
        "createdAt": new Date().toISOString(),
      }
      await blogsCollection.insertOne(blog)
      return blog
},

async findBlog(id: string): Promise<Blog | null> {
  return  blogsCollection.findOne({id: id}, { projection: { _id: 0 } }) || null
},

async updateBlog(
    body: {name: string; websiteUrl: string},
    blogId: string
    ): Promise<boolean | undefined >{
        const {name, websiteUrl } = body 
        // const blog = blogs.find(v => v.id === blogId)
        const blog = await blogsCollection.findOne({id: blogId})
        if (blog) {
          if(websiteUrl?.length <= 100 && typeof websiteUrl === 'string') {
           blogsCollection.updateOne({id: blogId}, {$set: {name: name, websiteUrl: websiteUrl}})
           return true
        }
        else {
          return false
          }
       }
      //   if (blog && blogId) {
      //     if(youtubeUrl?.length <= 100 && typeof youtubeUrl === 'string') {
      //      blog.name = name
      //      blog.youtubeUrl = youtubeUrl
      //      return {blog: blog}
      //   }
      //   else {
      //     const errors: SomeError[] = []
      //     if (!youtubeUrl ||  youtubeUrl?.length > 100 || typeof youtubeUrl !== 'string' ) errors.push({
      //       message: "url is not correct",
      //       field: "youtubeUrl",
      //     })
      //     return {errors: errors}
      //     }
      //  }
},
async removeBlog  (id: string): Promise<boolean | undefined>{
 const result = await blogsCollection.deleteOne({id:id})
  return result.deletedCount === 1
}
}