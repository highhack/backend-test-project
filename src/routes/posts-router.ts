import  { Router, Request, Response } from "express";
import { body} from "express-validator";
import { inputValidationMiddleware } from "../input-validation-middleware";
import { blogsRepository } from "../repositories/blogs-repository-db";
import { postsRepository } from "../repositories/posts-repository-db";

export const postsRouter = Router({})
export const deleteAllBlogsRouter = Router({})

const titleValidation = body('title')
.isString()
.trim()
.isLength({min: 1, max: 30})
// .withMessage('length is from 0 to 15')
// .withMessage(`dosn't string`)
const shortDescriptionalidation = body('shortDescription')
.isString()
.trim()
.isLength({min: 1, max: 100})
const contentValidation = body('content')
.isString()
.trim()
.isLength({min: 1, max: 1000})
const blogIdValidation = body('blogId')
.isString()
.trim()
.isLength({min: 1, max: 25})



postsRouter.get('/', (req: Request , res: Response) => {
  const posts = postsRepository.getAllPosts()
    res.status(200).send(posts)
  })

postsRouter.post('/', 
titleValidation,
shortDescriptionalidation,
contentValidation,
blogIdValidation,
inputValidationMiddleware,
async (req: Request , res: Response) => {
  const post = postsRepository.createPost(req.body)
  const blogs = blogsRepository.getAllBlogs()
  if((await blogs).some(async bl => bl.id === (await post).blogId)) 
  res.status(201).send(post)
  })

postsRouter.get('/:postId', (req: Request , res: Response) => {
    const postId = req.params.postId
    const post = postsRepository.findPost(postId)
    if (post && postId) res.send(post)
    else res.status(404).send()
  })

 postsRouter.put('/:postId',
 titleValidation,
 shortDescriptionalidation,
 contentValidation,
 blogIdValidation,
 inputValidationMiddleware,
 (req: Request , res: Response) => {
    const postId = req.params.postId
    const answer = postsRepository.updatePost(req.body, postId)
    if(answer?.post) res.status(204).send()
    // if(answer?.errors) res.status(400).send()
    else res.status(404).send()
    })
    
  postsRouter.delete('/:postId', (req: Request , res: Response) => {
    if(req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') res.status(401).send()
  const postId = req.params.postId
const isDeleted = postsRepository.removePost(postId)
  if(isDeleted)  res.status(204).send()
  else res.status(404).send()
  })