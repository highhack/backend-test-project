import { SomeError } from "../input-validation-middleware";

interface Blog {
    id: string;
    name: string;
    youtubeUrl: string;
  }
  
  export let blogs: Blog[] = []



export const blogsRepository = {
deleteAllBlogs: () => {
    blogs = []
    return blogs
},
getAllBlogs: () => {
    return blogs
},
createBlog: (body: {name: string; youtubeUrl: string}) => {

    const {name, youtubeUrl} = body 
      const blog = {
        "id": new Date().getTime().toString(),
        "name": name,
        "youtubeUrl": youtubeUrl,
      }
      blogs.push(blog)
      return blog
},

findBlog: (id: string) => {
    const blog = blogs.find(v => v.id === id)
    return blog
},

updateBlog: (
    body: {name: string; youtubeUrl: string},
    blogId: string
    ) => {
        const {name, youtubeUrl, } = body 
        const blog = blogs.find(v => v.id === blogId)
        if (blog && blogId) {
          if(youtubeUrl?.length <= 100 && typeof youtubeUrl === 'string') {
           blog.name = name
           blog.youtubeUrl = youtubeUrl
           return {blog: blog}
        }
        else {
          const errors: SomeError[] = []
          if (!youtubeUrl ||  youtubeUrl?.length > 100 || typeof youtubeUrl !== 'string' ) errors.push({
            message: "url is not correct",
            field: "youtubeUrl",
          })
          return {errors: errors}
          }
       }
},
removeBlog: (id: string) => {
    const blog = blogs.find(v => v.id === id)
  if (blog) {
  const videoIndex = blog && blogs.indexOf(blog)
   blogs.splice(videoIndex, 1)
return true
  }
}
}