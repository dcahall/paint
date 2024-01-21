import {action, makeObservable, observable} from "mobx";

class CanvasState {
    canvas = null
    constructor() {
        makeObservable(this, {
            canvas: observable,
            setCanvas: action
        })
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }
}

export default new CanvasState()