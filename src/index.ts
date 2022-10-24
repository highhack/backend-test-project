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

let videos: Video[] = []

const  availableResolutionsArray = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]

function isIsoDate(str: string ) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str); 
  return d instanceof Date &&  d.toISOString()===str; // valid date 
}


  app.use(bodyParser({}))

app.delete('/testing/all-data', (req: Request , res: Response) => {
  videos = []
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
console.log('POST', availableResolutions.every( (ai: string) => availableResolutionsArray.includes(ai)) );
if (title?.length <= 40 && typeof title === 'string' 
&& author?.length <= 20 && typeof author === 'string'
&& availableResolutions.every( (ai: string) => availableResolutionsArray.includes(ai)) ) {
  const date = new Date()
  const tomorow = new Date()
  tomorow.setDate(date.getDate() + 1)
  const video = {
    "id": new Date().getTime(),
    "title": title,
    "author": author,
    "canBeDownloaded": false,
    "minAgeRestriction": null,
    "createdAt": new Date().toISOString(),
    "publicationDate": tomorow.toISOString(),
    "availableResolutions": availableResolutions
  }
  videos.push(video)
  res.status(201).send(video)
}
else {
  const errors = []
  if (!title || title?.length > 40 || typeof title !== 'string') errors.push({
    "message": "string",
    "field": "title"
  })
  if (!author|| author.length > 20 || typeof author !== 'string' ) errors.push({
    "message": "string",
    "field": "author"
  })
  if (!availableResolutions.every( (ai: string) => availableResolutionsArray.includes(ai))) errors.push({
    "message": "string",
    "field": "availableResolutions"
  })
  res.status(400).send({
  "errorsMessages": errors
})}
})

app.get('/videos/:videoId', (req: Request , res: Response) => {
  const videoId = +req.params.videoId
  const video = videos.find(v => v.id === videoId)
  if (video && videoId) res.send(video)
  else res.status(404).send()
})

app.put('/videos/:videoId', (req: Request , res: Response) => {
  const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body 
  const videoId = +req.params.videoId
  const video = videos.find(v => v.id === videoId)
  if (video && videoId) {
    if (title?.length <= 40 && typeof title === 'string' &&
     author?.length <= 20 && typeof author === 'string' && 
     minAgeRestriction  && minAgeRestriction <= 18 &&
     publicationDate && isIsoDate(publicationDate) &&
     canBeDownloaded && typeof canBeDownloaded === 'boolean' &&  minAgeRestriction && publicationDate) {
     video.title = title
     video.author = author
     video.availableResolutions = availableResolutions
     video.canBeDownloaded = canBeDownloaded
     video.minAgeRestriction = minAgeRestriction
     video.publicationDate = publicationDate
     res.status(204).send()
  }
  else {
    const errors = []
    if (!title ||  title?.length > 40 || typeof title !== 'string') errors.push({
      "message": "string",
      "field": "title"
    })
    if (!author ||  author?.length > 20 || typeof author !== 'string' ) errors.push({
      "message": "string",
      "field": "author"
    })
    if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean' ) errors.push({
      "message": "string",
      "field": "canBeDownloaded"
    })
    if (!minAgeRestriction  || minAgeRestriction > 18) errors.push({
      "message": "string",
      "field": "minAgeRestriction"
    })
    if (!publicationDate  || isIsoDate(publicationDate)) errors.push({
      "message": "string",
      "field": "minAgeRestriction"
    })
    res.status(400).send({
  "errorsMessages": errors
})}
 }
  else res.status(404).send()
  })


app.delete('/videos/:videoId', (req: Request , res: Response) => {
const videoId = +req.params.videoId
const video = videos.find(v => v.id === videoId)
if (video && videoId) {
const videoIndex = video && videos.indexOf(video)
console.log('videoId', videoId, 'video',video ,'videoIndex',videoIndex );
 videos.splice(videoIndex, 1)
  res.status(204).send()
  console.log(videos)
}
else res.status(404).send()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})