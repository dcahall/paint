import '../styles/canvas.scss'

import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import canvasState from "../store/canvasState";
import toolState from "../store/toolState";

import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import {StartModal} from "./StartModal";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Canvas = observer(() => {
    const [name, setName] = useState()
    const canvasRef = useRef()
    const {id} = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
    }, [])

    useEffect(() => {
        if (name) {
            canvasState.setUserName(name)
            let socket = new WebSocket('ws://localhost:5000')
            const idUser = uuidv4()

            socket.onopen = () => {
                socket.send(JSON.stringify({
                    idSession: id,
                    idUser: idUser,
                    name: name,
                    method: 'connection'
                }))
            }

            canvasState.setIdUser(idUser)
            canvasState.setIdSession(id)
            canvasState.setSocket(socket)
            toolState.setTool(new Brush(canvasRef.current, socket, id, idUser))

            axios.get(`http://localhost:5000/image?id=${id}`)
                .then(res => {
                    const img = new Image()
                    const ctx = canvasRef.current.getContext('2d')

                    img.src = res.data.img
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                    }
                })
                .catch(console.error)

            socket.onmessage = e => {
                const msg = JSON.parse(e.data)

                switch (msg.method) {
                    case 'connection':
                        console.log(msg)
                        break
                    case 'draw':
                        drawHandler(msg.figure)
                        break
                    case 'undo':
                        canvasState.undo()
                        break
                    case 'redo':
                        canvasState.redo()
                        break
                }
            }
        }
    }, [name])

    const drawHandler = (figure) => {
        const ctx = canvasRef.current.getContext('2d')

        if (figure.type !== 'brush' && figure.type !== 'eraser' && figure.type !== 'started') {
            canvasState.pushToUndo(canvasState.canvas.toDataURL())
        }

        switch (figure.type) {
            case 'brush':
                Brush.draw(ctx, figure)
                break
            case 'rect':
                Rect.draw(ctx, figure)
                break
            case 'circle':
                Circle.draw(ctx, figure)
                break
            case 'eraser':
                Eraser.draw(ctx, figure)
                break
            case 'line':
                Line.draw(ctx, figure)
                break;
            case 'started':
                ctx.beginPath()
                canvasState.pushToUndo(canvasState.canvas.toDataURL())
                break
        }
    }

    const onMouseDown = () => {
        canvasState.pushToUndo(canvasState.canvas.toDataURL())
    }

    const onMouseUp = async () => {
        try {
            await axios.post(`http://localhost:5000/image?id=${id}`, {img: canvasRef.current.toDataURL()})
        } catch(e) {
            console.error(e)
        }

    }

    return (
        <div className='canvas'>
            <StartModal onSubmit={setName}/>
            <canvas
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                height={600}
                width={800}
                ref={canvasRef}
            >
            </canvas>
        </div>
    );
});

export default Canvas;