import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import routes from './routes'
import WebSocket from 'ws'

const app: Application = express()
const port: number = 3000

const wss = new WebSocket.Server({ port: 8002 })
// cara menjalankan via terminal untuk ngetrigger web socket server menggunakan bantuan package wscat
// wscat -c ws://localhost:8002

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected')

  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`)
    wss.clients.forEach((client) => {
      client.send(`Server received your message: ${message}`)
    })
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

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
