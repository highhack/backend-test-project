import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') res.status(401).send()
    const errors = validationResult(req)
if(!errors.isEmpty()) {
    const newErrors = errors.array().map(err => {return {"message": err.msg, "field": err.param}})
    const nameError = newErrors.find(err => err.field === 'name')
    const youtubeUrlError = newErrors.find(err => err.field === 'youtubeUrl')
    const titleError = newErrors.find(err => err.field === 'title')
    const shortDescriptionError = newErrors.find(err => err.field === 'shortDescription')
    const contentError = newErrors.find(err => err.field === 'content')
    const blogIdError = newErrors.find(err => err.field === 'blogId')
    const selectedErrors = []
    nameError && selectedErrors.push(nameError)
    youtubeUrlError && selectedErrors.push(youtubeUrlError)
    titleError && selectedErrors.push(titleError)
    shortDescriptionError && selectedErrors.push(shortDescriptionError)
    contentError && selectedErrors.push(contentError)
    blogIdError && selectedErrors.push(blogIdError)
  return res.status(400).json({
    "errorsMessages": selectedErrors
  })
}
else {
    next()
}
}