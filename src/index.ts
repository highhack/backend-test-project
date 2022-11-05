import  express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { videoRouter } from './routes/videos-router'
import {  blogsRouter } from './routes/blogs-router'
import {  postsRouter } from './routes/posts-router'
import { videosRepository } from './repositories/videos-repository'
import { blogsRepository } from './repositories/blogs-repository'
import { postsRepository } from './repositories/posts-repository'


export const app = express()
const port = process.env.PORT || 3002
app.use(bodyParser({}))

app.get('/', (req: Request , res: Response) => {
  res.status(200).send('videos and blogs!!!')
})

app.delete('/testing/all-data', (req: Request , res: Response) => {
 videosRepository.deleteAllVideo()
 blogsRepository.deleteAllBlogs()
 postsRepository.deleteAllPosts()
     res.status(204).send()
 })
 
app.use('/videos', videoRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

const startApp = async () => {
  await runDB()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp()