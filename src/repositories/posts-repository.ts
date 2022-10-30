interface Posts {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
  }
  
  export let posts: Posts[] = []



export const postsRepository = {
deleteAllPosts: () => {
    posts = []
    return posts
},
getAllPosts: () => {
    return posts
},
createPost: (body: {title: string, shortDescription: string, content: string, blogId: string}) => {

    const {title, shortDescription, content, blogId} = body 
      const post = {
        "id": new Date().getTime().toString(),
        "title": title,
        "shortDescription": shortDescription,
        "content": content,
        "blogId": blogId,
        "blogName": 'blogName',
      }
      posts.push(post)
      return post
},

findPost: (id: string) => {
    const post = posts.find(v => v.id === id)
    return post
},

updatePost: (
    body: {title: string, shortDescription: string, content: string, blogId: string},
    postId: string
    ) => {
        const {title, shortDescription, content, blogId} = body 
        const post = posts.find(v => v.id === postId)
        if (post && postId) {
        //   if(youtubeUrl?.length <= 100 && typeof youtubeUrl === 'string') {
           post.title = title
           post.shortDescription = shortDescription
           post.content = content
           post.blogId = blogId
           return {post: post}
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

removePost: (id: string) => {
    const post = posts.find(v => v.id === id)
  if (post) {
  const postIndex = post && posts.indexOf(post)
   posts.splice(postIndex, 1)
return true
  }
}
}