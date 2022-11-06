import { SomeError } from "../input-validation-middleware";

export interface Blog {
    id: string;
    name: string;
    youtubeUrl: string;
  }
  
export let blogs: Blog[] = []



export const blogsRepository = {
async deleteAllBlogs(): Promise<Blog[]> {
    blogs = []
    return blogs
},
async getAllBlogs(): Promise<Blog[]> {
    return blogs
},
async createBlog(body: {name: string; youtubeUrl: string}): Promise<Blog>{

    const {name, youtubeUrl} = body 
      const blog = {
        "id": new Date().getTime().toString(),
        "name": name,
        "youtubeUrl": youtubeUrl,
      }
      blogs.push(blog)
      return blog
},

async findBlog(id: string): Promise<Blog | undefined> {
  return blogs.find(v => v.id === id) 
},

async updateBlog(
    body: {name: string; youtubeUrl: string},
    blogId: string
    ): Promise<boolean | undefined >{
        const {name, youtubeUrl, } = body 
        const blog = blogs.find(v => v.id === blogId)
        if (blog && blogId) {
          if(youtubeUrl?.length <= 100 && typeof youtubeUrl === 'string') {
           blog.name = name
           blog.youtubeUrl = youtubeUrl
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
    const blog = blogs.find(v => v.id === id)
  if (blog) {
const videoIndex = blog && blogs.indexOf(blog)
   blogs.splice(videoIndex, 1)
return true
  }
  else return false
}
}