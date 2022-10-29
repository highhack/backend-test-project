import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') res.status(401).send()
    const errors = validationResult(req)
if(!errors.isEmpty()) {
    const newErrors = errors.array().map(err => {return {"message": err.msg, "field": err.param}})
    const nameError = newErrors.find(err => err.field === 'name')
    const youtubeUrlError = newErrors.find(err => err.field === 'youtubeUrl')
    const selectedErrors = []
    nameError && selectedErrors.push(nameError)
    youtubeUrlError && selectedErrors.push(youtubeUrlError)
  return res.status(400).json({
    "errorsMessages": selectedErrors
  })
}
else {
    next()
}
}