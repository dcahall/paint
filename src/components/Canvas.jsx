import '../styles/canvas.scss'

import React, {useEffect, useRef} from 'react';

import {observer} from "mobx-react-lite";

import canvasState from "../store/canvasState";
import toolState from "../store/toolState";

import Brush from "../tools/Brush";


const Canvas = observer(() => {
    const canvasRef = useRef()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasState.canvas))
    }, [])

    return (
        <div className='canvas'>
            <canvas height={600} width={800} ref={canvasRef}></canvas>
        </div>
    );
});

export default Canvas;