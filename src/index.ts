import  express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { videoRouter } from './routes/videos-router'
import {  blogsRouter } from './routes/blogs-router'
import {  postsRouter } from './routes/posts-router'
import { videosRepository } from './repositories/videos-repository-db'
import { blogsRepository } from './repositories/blogs-repository-db'
import { postsRepository } from './repositories/posts-repository-db'
import { runDb } from './repositories/db'


export const app = express()
const port = process.env.PORT || 3002
app.use(bodyParser({}))

app.get('/', (req: Request , res: Response) => {
  res.status(200).send('videos and blogs!!!')
})

app.delete('/testing/all-data', async (req: Request , res: Response) => {
  console.log('deleteAll');
//  videosRepository.deleteAllVideo()
 await blogsRepository.deleteAllBlogs()
 await postsRepository.deleteAllPosts()
     res.status(204).send()
 })
 
app.use('/videos', videoRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

const startApp = async () => {
  await runDb()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp()

