import { SomeError } from "../input-validation-middleware";
import {  blogsCollection } from "./db";

export interface Blog {
    id: string;
    name: string;
    youtubeUrl: string;
  }
  
// export let blogs: Blog[] = []



export const blogsRepository = {
async deleteAllBlogs(): Promise<Blog[]> {
  const result =  blogsCollection.deleteMany({})
  console.log('result', result)
    // blogs = []
    return blogsCollection.find({}).toArray()
},
async getAllBlogs(): Promise<Blog[]> {
  console.log('LLL', blogsCollection)
  return blogsCollection.find({}).toArray()
    // return blogs
},
async createBlog(body: {name: string; youtubeUrl: string}): Promise<Blog>{

    const {name, youtubeUrl} = body 
      const blog = {
        "id": new Date().getTime().toString(),
        "name": name,
        "youtubeUrl": youtubeUrl,
      }
      blogsCollection.insertOne(blog)
      // blogs.push(blog)
      return blog
},

async findBlog(id: string): Promise<Blog | undefined> {
  return await blogsCollection.findOne({id: id}) || undefined
  // return blogs.find(v => v.id === id) 
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
          //  blog.name = name
          //  blog.youtubeUrl = youtubeUrl
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
//     const blog = blogs.find(v => v.id === id)
//   if (blog) {
// const videoIndex = blog && blogs.indexOf(blog)
//    blogs.splice(videoIndex, 1)
// return true
//   }
//   else return false
}
}