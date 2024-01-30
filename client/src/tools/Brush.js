import Tool from "./Tool";

export default class Brush extends Tool {
    isActive = false

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
        this.ctx.beginPath()
        this.ctx.moveTo(e.clientX - rect.x, e.clientY - rect.y)

        this.socket.send(JSON.stringify({
            idUser: this.idUser,
            idSession: this.idSession,
            method: 'draw',
            figure: {
                type: 'started'
            }
        }))
    }

    onMouseUpHandler() {
        this.isActive = false
    }

    onMouseMoveHandler(e) {
        if (this.isActive) {
            const rect = e.target.getBoundingClientRect();
            this.draw(e.clientX - rect.x, e.clientY - rect.y)

            this.socket.send(JSON.stringify({
                idUser: this.idUser,
                idSession: this.idSession,
                method: 'draw',
                figure: {
                    type: 'brush',
                    x: e.clientX - rect.x,
                    y: e.clientY - rect.y,
                    styles: {
                        lineWidth: this.ctx.lineWidth,
                        strokeStyle: this.ctx.strokeStyle
                    }
                }
            }))
        }
    }

    draw(x, y) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    static draw(ctx, {x, y, styles}) {
        const undoChanges = Tool.changeStyles(ctx, styles)

        ctx.lineTo(x, y)
        ctx.stroke()

        undoChanges()
    }
}