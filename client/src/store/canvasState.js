import {action, makeObservable, observable} from "mobx";

class CanvasState {
    canvas = null
    undoList = []
    redoList = []

    constructor() {
        makeObservable(this, {
            canvas: observable,
            setCanvas: action
        })
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    pushToUndo = (data) => {
        this.undoList.push(data)
    }

    pushToRedo = (data) => {
        this.redoList.push(data)
    }

    undo() {
        let ctx = this.canvas.getContext('2d')
        if (this.undoList.length > 0) {
            this.pushToRedo(this.canvas.toDataURL())

            const dataURL = this.undoList.pop()
            const img = new Image()
            img.src = dataURL
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
        else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        if (this.redoList.length > 0) {
            let ctx = this.canvas.getContext('2d')
            const dataURL = this.redoList.pop()

            this.pushToUndo(this.canvas.toDataURL())

            const img = new Image()
            img.src = dataURL
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }

}

export default new CanvasState()