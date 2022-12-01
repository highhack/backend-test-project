import { postsCollection } from "../repositories/db";
import { postsRepository } from "../repositories/posts/posts-repository-db";

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




export const postsService = {
async deleteAllPosts(): Promise<Post[]> {
return await postsRepository.deleteAllPosts()
},

async getAllPosts(): Promise<Post[]> {
  return await postsRepository.getAllPosts()
},

findPost: async (id: string) => {
    return await postsRepository.findPost(id)
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
      await postsRepository.createPost(post)
      return post
},

updatePost: async (
    body: {title: string, shortDescription: string, content: string, blogId: string},
    postId: string
    ) => {
        return await postsRepository.updatePost(body, postId)
},

removePost: async (id: string) => {
 return await postsRepository.removePost(id)
}
}