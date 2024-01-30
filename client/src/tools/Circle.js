import Tool from "./Tool";

export default class Circle extends Tool {
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
        const rect = e.target.getBoundingClientRect()

        this.socket.send(JSON.stringify({
            idUser: this.idUser,
            idSession: this.idSession,
            method: 'draw',
            figure: {
                type: 'circle',
                x: this.startX,
                y: this.startY,
                radius: Math.abs(e.clientX - rect.x - this.startX),
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
            const radius = Math.abs(currentX - this.startX)

            this.draw(this.startX, this.startY, radius)
        }
    }

    draw(x, y, radius) {
        const img = new Image()
        img.src = this.saved

        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

            this.ctx.beginPath()
            this.ctx.arc(x, y, radius, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static draw(ctx, {x, y, radius, styles}) {
        const undoChanges = Tool.changeStyles(ctx, styles)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        undoChanges()
    }
}