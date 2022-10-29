import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authorization !== 'Basic YWRtaW46cXdlcnR5') res.status(401).send()
    const errors = validationResult(req)
if(!errors.isEmpty()) {
  return res.status(400).json({
    "errorsMessages": errors.array().map(err => {return {"message": err.msg, "field": err.param}})
  })
}
else {
    next()
}
}