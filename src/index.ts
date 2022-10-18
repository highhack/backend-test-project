import  express, {Request, Response}  from 'express'
const app = express()
const port = process.env.PORT || 3002

const videos = [
    {
      "id": 1,
      "title": "string",
      "author": "german1",
      "canBeDownloaded": true,
      "minAgeRestriction": null,
      "createdAt": "2022-10-17T16:15:24.839Z",
      "publicationDate": "2022-10-17T16:15:24.839Z",
      "availableResolutions": [
        "P144"
      ]
    },
    {
      "id": 2,
      "title": "string",
      "author": "german2",
      "canBeDownloaded": false,
      "minAgeRestriction": null,
      "createdAt": "2022-10-17T16:15:24.839Z",
      "publicationDate": "2022-10-17T16:15:24.839Z",
      "availableResolutions": [
        "P144"
      ]
    },
  ]

app.delete('/testing/all-data', (req: Request , res: Response) => {
  res.status(204).send()
})

app.get('/videos', (req: Request , res: Response) => {
  res.status(200).send(videos)
})

app.post('/videos', (req: Request , res: Response) => {
const {title, author, availableResolutions} = req.body 
if (title?.length < 40 && typeof title === 'string') {
  
}
})

app.get('/videos/:videoId', (req: Request , res: Response) => {
  let videoId = +req.body.videoId
  let video = videos.find(v => v.id === videoId)
  if (video) res.status(200).send(video)
  else res.status(400).send()
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
  let videoId = +req.body.videoId
  let video = videos.find(v => v.id === videoId)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})