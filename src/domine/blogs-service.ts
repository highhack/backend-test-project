import { FindOptions } from "mongodb";
import { blogsRepository } from "../repositories/blogs-repository-db";
import { blogsCollection } from "../repositories/db";

export interface Blog {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    _id?: string
  }
  

export const blogsService = {
async deleteAllBlogs(): Promise<Blog[]> {
  blogsCollection.deleteMany({})
    return blogsCollection.find({}).toArray()
},
async getAllBlogs(): Promise<Blog[]> {
   return blogsRepository.getAllBlogs()
},

async findBlog(id: string): Promise<Blog | null> {
    return blogsRepository.findBlog(id)
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
    const createdBlog = blogsRepository.createBlog(blog)
      return createdBlog
},

async updateBlog(
    body: {name: string; websiteUrl: string},
    blogId: string
    ): Promise<boolean | undefined >{
        const {name, websiteUrl } = body 
        // const blog = blogs.find(v => v.id === blogId)
        const blog = await blogsCollection.findOne({id: blogId})
        if (blog) {
          // if(websiteUrl?.length <= 100 && typeof websiteUrl === 'string') {
           blogsCollection.updateOne({id: blogId}, {$set: {name: name, websiteUrl: websiteUrl}})
           return true
        //    return true
        // }
       }
        return false

},
async removeBlog  (id: string): Promise<boolean | undefined>{
 const result = await blogsCollection.deleteOne({id:id})
  return result.deletedCount === 1
}
}