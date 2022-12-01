import { blogsRepository } from "../repositories/blogs/blogs-repository-db";

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
return blogsRepository.deleteAllBlogs()
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
    body: {name: string; websiteUrl: string, description: string},
    blogId: string
    ): Promise<boolean | undefined >{
         return await blogsRepository.updateBlog( body, blogId)

},
async removeBlog  (id: string): Promise<boolean | undefined>{
 return  await blogsRepository.removeBlog(id)
}
}