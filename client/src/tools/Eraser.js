import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas, socket, idSession, idUser) {
        super(canvas, socket, idSession, idUser);
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
                    type: 'eraser',
                    x: e.clientX - rect.x,
                    y: e.clientY - rect.y,
                }
            }))
        }
    }

    draw(x, y) {
        const prevStrokeStyle = this.ctx.strokeStyle

        this.ctx.lineTo(x, y)
        this.ctx.strokeStyle = '#ffffff'
        this.ctx.stroke()

        this.ctx.strokeStyle = prevStrokeStyle
    }

    static draw(ctx, x, y) {
        const prevStrokeStyle = ctx.strokeStyle

        ctx.lineTo(x, y)
        ctx.strokeStyle = '#ffffff'
        ctx.stroke()

        ctx.strokeStyle = prevStrokeStyle
    }
}