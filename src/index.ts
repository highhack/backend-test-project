import  express, {Request, Response}  from 'express'
import bodyParser from 'body-parser'

interface Video { 
  id: number; 
  title: string; 
  author: string; 
  canBeDownloaded: boolean; 
  minAgeRestriction: null; 
  createdAt: string; 
  publicationDate: string; 
  availableResolutions: any }
const app = express()
const port = process.env.PORT || 3002


enum AvailableResolutions  {
   P144 = 'P144', 
   P240 = 'P240', 
   P360 = 'P360', 
   P480 = 'P480', 
   P720 = 'P720', 
   P1080 = 'P1080', 
   P1440 = 'P1440', 
   P2160 = 'P2160' 
}

const videos: Video[] = []

  app.use(bodyParser({}))

app.delete('/testing/all-data', (req: Request , res: Response) => {
  res.status(204).send()
})

app.get('/', (req: Request , res: Response) => {
  res.status(200).send('videos!!!')
})

app.get('/videos', (req: Request , res: Response) => {
  res.status(200).send(videos)
})

app.post('/videos', (req: Request , res: Response) => {
const {title, author, availableResolutions} = req.body 
if (title?.length < 40 && typeof title === 'string' 
&& author?.length < 20 && typeof author === 'string' ) {
  const currentDate = new Date().toISOString()
  const  tommotowDate = new Date(Date.now() + ( 3600 * 1000 * 24)).toISOString()
  const video = {
    "id": 3,
    "title": title,
    "author": author,
    "canBeDownloaded": false,
    "minAgeRestriction": null,
    "createdAt": currentDate,
    "publicationDate": tommotowDate,
    "availableResolutions": availableResolutions
  }
  videos.push(video)
  res.status(201).send(video)
}
else res.status(400).send({
  "errorsMessages": [
    {
      "message": "string",
      "field": "string"
    }
  ]
})
})

app.get('/videos/:videoId', (req: Request , res: Response) => {
  let videoId = +req.params.videoId
  console.log(videoId)
  let video = videos.find(v => v.id === videoId)
  if (video) res.send(video)
  else res.status(404).send()
})

app.put('/videos/:videoId', (req: Request , res: Response) => {
  let videoId = +req.body.videoId
  let video = videos.find(v => v.id === videoId)
  let title = req.body.title
  if (video && typeof title === 'string') {
    video.title = title
    res.status(204).send()}
  if (typeof title !== 'string') {
    res.status(400).send({
      "errorsMessages": [
        {
          "message": "string",
          "field": "string"
        }
      ]
    })}
  else res.status(404).send()
})


app.delete('/videos/:videoId', (req: Request , res: Response) => {
  let videoId = +req.params.videoId
  let video = videos.find(v => v.id === videoId)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})