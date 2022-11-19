import {  blogsCollection } from "./db";

export interface Blog {
    id: string;
    name: string;
    websiteUrl: string;
    createAt: string
  }
  

export const blogsRepository = {
async deleteAllBlogs(): Promise<Blog[]> {
  blogsCollection.deleteMany({})
    return blogsCollection.find({}).toArray()
},
async getAllBlogs(): Promise<Blog[]> {
  return blogsCollection.find({}).toArray()
},
async createBlog(body: {name: string; websiteUrl: string}): Promise<Blog>{

    const {name, websiteUrl} = body 
      const blog = {
        "id": new Date().getTime().toString(),
        "name": name,
        "websiteUrl": websiteUrl,
        "createAt": new Date().toISOString(),
      }
      blogsCollection.insertOne(blog)
      return blog
},

async findBlog(id: string): Promise<Blog | undefined> {
  return await blogsCollection.findOne({id: id}) || undefined
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