const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path = require('path')


const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.post('/image', function (req, res) {
    try {
        let data = req.body.img.replace('data:image/png;base64,', '');
        fs.writeFileSync(path.resolve(__dirname, 'image', `${req.query.id}.png`), data, 'base64')

        res.status(200).json({message: 'Image succesfully saved'})
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Error happens'})
    }
})

app.get('/image', function(req, res) {
    try {
        const img = fs.readFileSync(path.resolve(__dirname, 'image', `${req.query.id}.png`), 'base64')

        res.status(200).json({img: 'data:image/png;base64,' + img})
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Error happens'})
    }
})
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
            case 'undo':
                broadCastConnection(ws, message)
                break
            case 'redo':
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
        if (client.idSession === msg.idSession && msg.idUser !== client.idUser) {
            client.send(JSON.stringify(msg))
        }
    })
}
