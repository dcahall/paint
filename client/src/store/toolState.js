import {action, makeObservable, observable} from "mobx";

class ToolState {
    tool = null

    constructor() {
        makeObservable(this, {
            tool: observable,
            setTool: action,
            setFillColor: action,
            setStrokeColor: action,
            setLineWidth: action
        })
    }

    setFillColor(color) {
        this.tool.fillColor = color
    }

    setStrokeColor(color) {
        this.tool.strokeColor = color
    }

    setLineWidth(width) {
        this.tool.lineWidth = width
    }

    setTool(tool) {
        this.tool = tool
    }
}

export default new ToolState()