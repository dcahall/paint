import Tool from "./Tool";
export default class Rect extends Tool {
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
    }

    onMouseUpHandler(e) {
        this.isActive = false
        const rect = e.target.getBoundingClientRect();

        this.socket.send(JSON.stringify({
            idUser: this.idUser,
            idSession: this.idSession,
            method: 'draw',
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: e.clientX - rect.x - this.startX,
                height: e.clientY - rect.y - this.startY,
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
            const width = currentX - this.startX
            const height = currentY - this.startY

            this.draw(this.startX, this.startY, width, height)
        }
    }

    draw(x, y, width, height) {
        const img = new Image()
        img.src = this.saved

        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

            this.ctx.beginPath()
            this.ctx.rect(x, y, width, height)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static draw(ctx, {x, y, width, height, styles}) {
        const undoChanges = Tool.changeStyles(ctx, styles)

        ctx.beginPath()
        ctx.rect(x, y, width, height)
        ctx.fill()
        ctx.stroke()

        undoChanges()
    }
}