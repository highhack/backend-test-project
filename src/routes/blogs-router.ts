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
const websiteUrlValidation = body('websiteUrl')
.isString()
.withMessage(`not string`)
.trim()
.isLength({min: 1, max: 100})
.withMessage('length is from 0 to 100')
.isURL()
.withMessage(`not url`)
const descriptionValidation = body('description')
.isString()
.withMessage(`not string`)
.trim()
.isLength({min: 1, max: 500})
.withMessage('length is from 0 to 100')
const createAtValidation = body('createAt')
.isString()
.withMessage(`not string`)
.trim()
.matches(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
.withMessage('date is not correct')
.isLength({min: 1, max: 500})
.withMessage('length is from 0 to 100')





blogsRouter.get('/', async (req: Request , res: Response) => {
  const blogsPromise = blogsRepository.getAllBlogs()
  const blogs = await blogsPromise
    res.status(200).send(blogs)
  })

blogsRouter.post('/', 
nameValidation,
descriptionValidation,
websiteUrlValidation,
inputValidationMiddleware,
async (req: Request , res: Response) => {
  const blogPromise = blogsRepository.createBlog(req.body)
  const blog = await blogPromise
  delete blog._id
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
 descriptionValidation,
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
    
  blogsRouter.delete('/:blogId',
  inputValidationMiddleware, 
  async (req: Request , res: Response) => {
    if(req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') res.status(401).send()
  const blogId = req.params.blogId
const isDeletedPromise =  blogsRepository.removeBlog(blogId)
const isDeleted = await isDeletedPromise
  if(isDeleted)  res.status(204).send()
  else res.status(404).send()
  })