import Tool from "./Tool";
import canvas from "../components/Canvas";

export default class Brush extends Tool {
    isActive = false

    constructor(canvas) {
        super(canvas);
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
    }

    onMouseUpHandler() {
        this.isActive = false
    }

    onMouseMoveHandler(e) {
        if (this.isActive) {
            const rect = e.target.getBoundingClientRect();
            this.drawn(e.clientX - rect.x, e.clientY - rect.y)
        }
    }

    drawn(x, y) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}