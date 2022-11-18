import {  blogsCollection } from "./db";

export interface Blog {
    id: string;
    name: string;
    youtubeUrl: string;
    createAt: string
  }
  

export const blogsRepository = {
async deleteAllBlogs(): Promise<Blog[]> {
  const result =  blogsCollection.deleteMany({})
    return blogsCollection.find({}).toArray()
},
async getAllBlogs(): Promise<Blog[]> {
  return blogsCollection.find({}).toArray()
},
async createBlog(body: {name: string; youtubeUrl: string}): Promise<Blog>{

    const {name, youtubeUrl} = body 
      const blog = {
        "id": new Date().getTime().toString(),
        "name": name,
        "youtubeUrl": youtubeUrl,
        "createAt": new Date().toISOString(),
      }
      blogsCollection.insertOne(blog)
      return blog
},

async findBlog(id: string): Promise<Blog | undefined> {
  return await blogsCollection.findOne({id: id}) || undefined
},

async updateBlog(
    body: {name: string; youtubeUrl: string},
    blogId: string
    ): Promise<boolean | undefined >{
        const {name, youtubeUrl } = body 
        // const blog = blogs.find(v => v.id === blogId)
        const blog = await blogsCollection.findOne({id: blogId})
        if (blog) {
          if(youtubeUrl?.length <= 100 && typeof youtubeUrl === 'string') {
           blogsCollection.updateOne({id: blogId}, {$set: {name: name, youtubeUrl: youtubeUrl}})
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