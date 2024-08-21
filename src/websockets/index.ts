// websocket.ts
import WebSocket from 'ws'

const wss = new WebSocket.Server({ port: 8001 })

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected')

  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server received your message: ${message}`)
      }
    })
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

export { wss }
