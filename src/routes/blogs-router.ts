import  { Router, Request, Response } from "express";
import { body} from "express-validator";
import { inputValidationMiddleware } from "../input-validation-middleware";
import { blogsRepository } from "../repositories/blogs-repository";

export const blogsRouter = Router({})
export const deleteAllBlogsRouter = Router({})


const nameValidation = body('name')
.isLength({min: 0, max: 15})
.withMessage('length is from 0 to 15')
.isString()
.withMessage(`dosn't string`)
const youtubeUrlValidation = body('youtubeUrl').trim()
.isLength({min: 0, max: 100})
.withMessage('length is from 0 to 100')
.isString()
.withMessage(`not string`)
.isURL()
.withMessage(`not url`)





blogsRouter.get('/', (req: Request , res: Response) => {
  const blogs = blogsRepository.getAllBlogs()
    res.status(200).send(blogs)
  })

blogsRouter.post('/', 
nameValidation,
youtubeUrlValidation,
inputValidationMiddleware,
(req: Request , res: Response) => {
  const blog = blogsRepository.createBlog(req.body)
  res.status(201).send(blog)
  })

blogsRouter.get('/:blogId', (req: Request , res: Response) => {
    const blogId = req.params.blogId
    const blog = blogsRepository.findBlog(blogId)
    if (blog && blogId) res.send(blog)
    else res.status(404).send()
  })

 blogsRouter.put('/:blogId',
 nameValidation,
 youtubeUrlValidation,
 inputValidationMiddleware,
 (req: Request , res: Response) => {
    const blogId = req.params.blogId
    const answer = blogsRepository.updateBlog(req.body, blogId)
    if(answer?.blog) res.status(204).send()
    if(answer?.errors) res.status(400).send()
    else res.status(404).send()
    })
    
  blogsRouter.delete('/:blogId', (req: Request , res: Response) => {
    if(req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') res.status(401).send()
  const blogId = req.params.blogId
const isDeleted = blogsRepository.removeBlog(blogId)
  if(isDeleted)  res.status(204).send()
  else res.status(404).send()
  })