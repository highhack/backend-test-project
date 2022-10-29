import express, { Router, Request, Response } from "express";
import { videosRepository } from "../repositories/videos-repository";
    
export const videoRouter = Router({})
export const deleteAllVideosRouter = Router({})
const app = express()


videoRouter.get('/', (req: Request , res: Response) => {
  const videos = videosRepository.getAllVideos()
    res.status(200).send(videos)
  })
videoRouter.post('/', (req: Request , res: Response) => {
const {video, errors} = videosRepository.createVideo(req.body)
if(video) res.status(201).send(video)
if(errors) res.status(400).send({
  "errorsMessages": errors
})
  })

videoRouter.get('/:videoId', (req: Request , res: Response) => {
    const videoId = +req.params.videoId
    const video = videosRepository.findVideo(videoId)
    if (video && videoId) res.send(video)
    else res.status(404).send()
  })

videoRouter.put('/:videoId', (req: Request , res: Response) => {
  const videoId = +req.params.videoId
    const answer = videosRepository.updateVideo(req.body, videoId)
    if(answer?.isUpdated)  res.status(204).send()
    if (answer?.errors) res.status(400).send({
      "errorsMessages": answer?.errors
    })
    else res.status(404).send()
    })
videoRouter.delete('/:videoId', (req: Request , res: Response) => {
  const videoId = +req.params.videoId
  const isDeleted = videosRepository.removeVideo(videoId)
  if (isDeleted) res.status(204).send()
  else res.status(404).send()
  })