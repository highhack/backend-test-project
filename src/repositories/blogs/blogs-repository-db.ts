import {  blogsCollection } from "../db";

export interface Blog {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    _id?: string
  }

  
  export interface BlogQueries {
    searchNameTerm: string | null;
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: 1 | -1
   } 

  

export const blogsRepository = {
  
async deleteAllBlogs(): Promise<Blog[]> {
  blogsCollection.deleteMany({})
  return blogsCollection.find({}).toArray()
},

async getTotalCount(): Promise<number> {
 return  await blogsCollection.find({}).count()
},

async getAllBlogs(queries: BlogQueries): Promise<Blog[]> {
  const {  searchNameTerm, pageNumber, pageSize, sortBy, sortDirection} = queries
  const blogs = await blogsCollection
  //  .find( {}, { projection: { _id: 0 } })
  .find(searchNameTerm ? {$text: {$search: searchNameTerm}}: { }, { projection: { _id: 0 } })
  // .sort({[sortBy]: sortDirection})
  // .skip((pageNumber - 1) * pageSize )
  // .limit(pageSize)
  .toArray()
  console.log('blogs',  blogs)
  return blogs
},

async findBlog(id: string): Promise<Blog | null> {
  return  await blogsCollection.findOne({id: id}, { projection: { _id: 0 } }) || null
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
      const result = await blogsCollection.updateOne(
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