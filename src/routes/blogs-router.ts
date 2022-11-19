import  { Router, Request, Response } from "express";
import { body} from "express-validator";
import { inputValidationMiddleware } from "../input-validation-middleware";
import { Blog, blogsRepository } from "../repositories/blogs-repository-db";

export const blogsRouter = Router({})
export const deleteAllBlogsRouter = Router({})

const nameValidation = body('name')
.isString()
.trim()
.isLength({min: 1, max: 15})
// .withMessage('length is from 0 to 15')
// .withMessage(`dosn't string`)
const websiteUrlValidation = body('youtubeUrl')
.isString()
.withMessage(`not string`)
.trim()
.isLength({min: 1, max: 100})
.withMessage('length is from 0 to 100')
.isURL()
.withMessage(`not url`)





blogsRouter.get('/', async (req: Request , res: Response) => {
  const blogsPromise = blogsRepository.getAllBlogs()
  const blogs = await blogsPromise
    res.status(200).send(blogs)
  })

blogsRouter.post('/', 
nameValidation,
websiteUrlValidation,
inputValidationMiddleware,
async (req: Request , res: Response) => {
  const blogPromise = blogsRepository.createBlog(req.body)
  const blog = await blogPromise
  res.status(201).send(blog)
  })

blogsRouter.get('/:blogId', async (req: Request , res: Response) => {
    const blogId = req.params.blogId
    const blogPromise  = blogsRepository.findBlog(blogId)
    const blog = await blogPromise
    if (blog && blogId) res.send(blog)
    else res.status(404).send()
  })

 blogsRouter.put('/:blogId',
 nameValidation,
 websiteUrlValidation,
 inputValidationMiddleware, async (req: Request , res: Response) =>  {
    const blogId = req.params.blogId
    const isUpdatedPromise = blogsRepository.updateBlog(req.body, blogId)
    const isUpdated = await isUpdatedPromise
    if (isUpdated) res.status(204).send()
    // if(answer?.blog) res.status(204).send()
    // if(answer?.errors) res.status(400).send()
    else res.status(404).send()
    })
    
  blogsRouter.delete('/:blogId', async (req: Request , res: Response) => {
    if(req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') res.status(401).send()
  const blogId = req.params.blogId
const isDeletedPromise =  blogsRepository.removeBlog(blogId)
const isDeleted = await isDeletedPromise
  if(isDeleted)  res.status(204).send()
  else res.status(404).send()
  })