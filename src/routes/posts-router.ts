import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { postsService } from "../domine/posts-service";
import { inputValidationMiddleware } from "../input-validation-middleware";
import { blogsRepository } from "../repositories/blogs/blogs-repository-db";

export const postsRouter = Router({});
export const deleteAllBlogsRouter = Router({});

const titleValidation = body("title")
  .isString()
  .trim()
  .isLength({ min: 1, max: 30 });
// .withMessage('length is from 0 to 15')
// .withMessage(`dosn't string`)
const shortDescriptionaValidation = body("shortDescription")
  .isString()
  .trim()
  .isLength({ min: 1, max: 100 });
const contentValidation = body("content")
  .isString()
  .trim()
  .isLength({ min: 1, max: 1000 });
const blogIdValidation = body("blogId")
  .isString()
  .trim()
  .isLength({ min: 1, max: 25 });

postsRouter.get("/", async (req: Request, res: Response) => {
  const { query } = req;
  const postsPromise = postsService.getAllPosts(query);
  const posts = await postsPromise;
  res.status(200).send(posts);
});

postsRouter.post(
  "/",
  titleValidation,
  shortDescriptionaValidation,
  contentValidation,
  blogIdValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const postPromise = postsService.createPost(req.body);
    const post = await postPromise;
    delete post._id;
    // const blogs = await blogsRepository.getAllBlogs()
    // if(blogs.some(bl => bl.id === post.blogId))
    res.status(201).send(post);
  }
);

postsRouter.get("/:postId", async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const postPromise = postsService.findPost(postId);
  const post = await postPromise;
  if (post && postId) res.send(post);
  else res.status(404).send();
});

postsRouter.put(
  "/:postId",
  titleValidation,
  shortDescriptionaValidation,
  contentValidation,
  blogIdValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const answer = await postsService.updatePost(req.body, postId);
    if (answer) res.status(204).send();
    // if(answer?.errors) res.status(400).send()
    else res.status(404).send();
  }
);

postsRouter.delete(
  "/:postId",
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    // if(req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') res.status(401).send()
    const postId = req.params.postId;
    if (postId) {
      const isDeleted = await postsService.removePost(postId);
      if (isDeleted) res.status(204).send();
      else res.status(404).send();
    }
  }
);
