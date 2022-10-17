import  express, {Request, Response}  from 'express'
const app = express()
const port = process.env.PORT || 3002

app.get('/', (req: Request , res: Response) => {
  debugger
  res.send('!hello world!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})