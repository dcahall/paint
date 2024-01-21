import Tool from "./Tool";
import canvas from "../components/Canvas";

export default class React extends Tool {
    isActive = false
    startX = null
    startY = null
    saved = null

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
        this.startX = e.clientX - rect.x
        this.startY = e.clientY - rect.y
        this.saved = this.canvas.toDataURL()
    }

    onMouseUpHandler(e) {
        this.isActive = false
    }

    onMouseMoveHandler(e) {
        if (this.isActive) {
            const rect = e.target.getBoundingClientRect();
            const currentX = e.clientX - rect.x
            const currentY = e.clientY - rect.y
            const width = currentX - this.startX
            const height = currentY - this.startY

            this.drawn(this.startX, this.startY, width, height)
        }
    }

    drawn(x, y, width, height) {
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
}