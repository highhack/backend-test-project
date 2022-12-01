import { FindOptions } from "mongodb";
import {  blogsCollection } from "../db";

export interface Blog {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    _id?: string
  }
  

export const blogsRepository = {
  
async deleteAllBlogs(): Promise<Blog[]> {
  blogsCollection.deleteMany({})
  return blogsCollection.find({}).toArray()
},

async getAllBlogs(): Promise<Blog[]> {
   return blogsCollection.find({ }, { projection: { _id: 0 } }).toArray()
},

async findBlog(id: string): Promise<Blog | null> {
  return  blogsCollection.findOne({id: id}, { projection: { _id: 0 } }) || null
},

async createBlog(blog: Blog): Promise<Blog>{
     await blogsCollection.insertOne(blog)
      return blog
},

async updateBlog(
    body: {name: string; websiteUrl: string, description: string},
    blogId: string
    ): Promise<boolean | undefined >{
      const {name, websiteUrl, description } = body 
      const result = await blogsCollection.updateOne
      (
        {id: blogId}, 
        {$set: {description: description, name: name, websiteUrl: websiteUrl}}
      )
      return result.matchedCount === 1
},

async removeBlog  (id: string): Promise<boolean | undefined>{
 const result = await blogsCollection.deleteOne({id:id})
  return result.deletedCount === 1
}
}