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

  export interface PostsData {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: Post[]
  }

  export interface PostQueries {
    searchNameTerm?: string | null;
    pageNumber?: string;
    pageSize?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc'
  } 

  function sortByDirection (str: string |  undefined) {
    if (str === 'desc') return -1
    if (str === 'asc') return 1 
    return  -1
  }



export const postsService = {
async deleteAllPosts(): Promise<Post[]> {
return await postsRepository.deleteAllPosts()
},

async getAllPosts(queries: PostQueries): Promise<PostsData> {
  const {searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = queries
  // const filter: any = {}
  // filter.name = {$regex: searchNameTerm, "$options": '1'}
  const totalCount = await postsRepository.getTotalCount()
  const createdQueries = {
    searchNameTerm: searchNameTerm || null,
    pageNumber: Number(pageNumber) || 1,
    pageSize: Number(pageSize) || 10,
    sortBy: sortBy || 'createdAt',
    sortDirection: sortByDirection(sortDirection) as 1 | -1
    } 
  const blogs = await postsRepository.getAllPosts(createdQueries)
   return {
    pagesCount: Math.ceil(totalCount/Number(pageSize || 10)),
    page: Number(pageNumber) || 1,
    pageSize: Number(pageSize) || 10,
    totalCount: totalCount,
    items: blogs
  }
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

async createPostByBlogId(body: {title: string, shortDescription: string, content: string}, blogId: string): Promise<Post> {

    const {title, shortDescription, content} = body 
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