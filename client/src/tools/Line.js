import Tool from "./Tool";

export default class Line extends Tool {
    isActive = false
    startX = null
    startY = null
    saved = null

    constructor(canvas, socket, idSession, idUser) {
        super(canvas, socket, idSession, idUser);
        this.listen()
    }

    listen() {
        this.canvas.onmousedown = this.onMouseDownHandler.bind(this)
        this.canvas.onmouseup = this.onMouseUpHandler.bind(this)
        this.canvas.onmousemove = this.onMouseMoveHandler.bind(this)
    }

    onMouseDownHandler(e) {
        this.isActive = true

        const rect = e.target.getBoundingClientRect();
        this.startX = e.clientX - rect.x
        this.startY = e.clientY - rect.y
        this.saved = this.canvas.toDataURL()

        this.ctx.moveTo(this.startX, this.startY)
    }

    onMouseUpHandler(e) {
        this.isActive = false
        const rect = e.target.getBoundingClientRect();

        this.socket.send(JSON.stringify({
            idUser: this.idUser,
            idSession: this.idSession,
            method: 'draw',
            figure: {
                type: 'line',
                startX: this.startX,
                startY: this.startY,
                x: e.clientX - rect.x,
                y: e.clientY - rect.y,
                styles: {
                    lineWidth: this.ctx.lineWidth,
                    strokeStyle: this.ctx.strokeStyle,
                    fillStyle: this.ctx.fillStyle
                }
            }
        }))
    }

    onMouseMoveHandler(e) {
        if (this.isActive) {
            const rect = e.target.getBoundingClientRect();
            const currentX = e.clientX - rect.x
            const currentY = e.clientY - rect.y

            this.draw(currentX, currentY)
        }
    }

    draw(x, y) {
        const img = new Image()
        img.src = this.saved

        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
    }

    static draw(ctx, {startX, startY, x, y, styles}) {
        const undoChanges = Tool.changeStyles(ctx, styles)

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(x, y)
        ctx.stroke()

        undoChanges()
    }
}