import Brush from "./Brush";
import Tool from "./Tool";

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
                    styles: {
                        lineWidth: this.ctx.lineWidth,
                    }
                }
            }))
        }
    }

    draw(x, y) {
        const undoChanges = Tool.changeStyles(this.ctx, {strokeStyle: this.ctx.strokeStyle})

        this.ctx.lineTo(x, y)
        this.ctx.strokeStyle = '#ffffff'
        this.ctx.stroke()

        undoChanges()
    }

    static draw(ctx, {x, y, styles}) {
        const undoChanges = Tool.changeStyles(ctx, {strokeStyle: '#ffffff', ...styles})

        ctx.lineTo(x, y)
        ctx.stroke()

        undoChanges()
    }
}