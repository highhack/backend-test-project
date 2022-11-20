import { postsCollection } from "./db";

export interface Post {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
  }




export const postsRepository = {
async deleteAllPosts(): Promise<Post[]> {
   postsCollection.deleteMany({})
    return postsCollection.find({}).toArray()
},

async getAllPosts(): Promise<Post[]> {
  return postsCollection.find({}, { projection: { _id: 0 } }).toArray()
},

async createPost(body: {title: string, shortDescription: string, content: string, blogId: string}) {

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
      postsCollection.insertOne(post)
      return post
},

 findPost: async (id: string) => {
 return await postsCollection.findOne({id: id}, { projection: { _id: 0 } }) || undefined

},

updatePost: async (
    body: {title: string, shortDescription: string, content: string, blogId: string},
    postId: string
    ) => {
        const {title, shortDescription, content, blogId} = body 
        const post = await postsCollection.findOne({id: blogId})
        if (post && postId) {
        //   if(youtubeUrl?.length <= 100 && typeof youtubeUrl === 'string') {
          postsCollection.updateOne({id: postId}, {$set: 
            {
              title: title, 
              shortDescription: shortDescription, 
              content:content, 
              blogId: blogId,
            }})
            
          //  post.title = title
          //  post.shortDescription = shortDescription
          //  post.content = content
          //  post.blogId = blogId
          //  return {post: post}
          return true
        // }
    //     else {
    //       const errors = []
    //       if (!youtubeUrl ||  youtubeUrl?.length > 100 || typeof youtubeUrl !== 'string' ) errors.push({
    //         "message": "url is not correct",
    //         "field": "youtubeUrl"
    //       })
    //       return {errors: errors}
    //       }
       }
},

removePost: async (id: string) => {
  const result = await postsCollection.deleteOne({id:id})
  return result.deletedCount === 1
}
}