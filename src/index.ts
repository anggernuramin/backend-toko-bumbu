import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import routes from './routes'

const app: Application = express()
const port: number = 3000

// middleware
app.use(express.json())
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

// kumpulan endpoint api
routes(app)

app.listen(port, () => {
  //   console.log(`Example app listening on port ${port}`)
})
