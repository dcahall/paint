import Tool from "./Tool";
import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas) {
        super(canvas);
    }

    drawn(x, y) {
        this.ctx.lineTo(x, y)
        this.ctx.strokeStyle = '#ffffff'
        this.ctx.stroke()
    }
}