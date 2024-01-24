import '../styles/canvas.scss'

import React, {useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

import canvasState from "../store/canvasState";
import toolState from "../store/toolState";

import Brush from "../tools/Brush";

const Canvas = observer(() => {
    const canvasRef = useRef()
    const {id} = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasState.canvas))
    }, [])

    useEffect(() => {
        let socket = new WebSocket('ws://localhost:5000')

        socket.onopen = () => {
            socket.send(JSON.stringify({
                id: id,
                name: 'dssds',
                method: 'connection'
            }))
        }

        socket.onmessage = e => console.log(JSON.parse(e.data))
    }, [])

    const onMouseDown = () => {
        canvasState.pushToUndo(canvasState.canvas.toDataURL())
    }

    return (
        <div className='canvas'>
            <canvas
                onMouseDown={onMouseDown}
                height={600}
                width={800}
                ref={canvasRef}
            >
            </canvas>
        </div>
    );
});

export default Canvas;