const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        const message = JSON.parse(msg)

        switch (message.method) {
            case 'connection':
                connectionHandler(ws, message)
                break
            case 'draw':
                broadCastConnection(ws, message)
                break
        }
    })
})

app.listen(PORT, () => console.log(`server started on port: ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.idSession = msg.idSession
    ws.idUser = msg.idUser
    broadCastConnection(ws, msg)
}

const broadCastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.idSession === msg.idSession) {
            if (msg.method === 'connection' || msg.method === 'draw' && msg.idUser !== client.idUser) {
                client.send(JSON.stringify(msg))
            }
        }
    })
}
