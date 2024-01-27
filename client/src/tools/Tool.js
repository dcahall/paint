export default class Tool {
    canvas = null
    ctx = null
    socket = null
    idSession = null
    idUser = null

    constructor(canvas, socket, idSession, idUser) {
        this.canvas = canvas
        this.socket = socket
        this.idSession = idSession
        this.idUser = idUser
        this.ctx = canvas.getContext('2d')
        this.destroyEventListiner()
    }

    set fillColor(color) {
        this.ctx.fillStyle = color
    }

    set strokeColor(color) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width
    }

    destroyEventListiner() {
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
        this.canvas.onmousemove = null
    }
}