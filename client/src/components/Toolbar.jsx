import '../styles/toolbar.scss'

import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {ColorPicker} from "antd";

import toolState from "../store/toolState";
import canvasState from "../store/canvasState";

import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import Line from "../tools/Line";

const Toolbar = () => {
    const {id} = useParams()
    const [activeTool, setActiveTool] = useState('Brush')
    const onChangeColor = (color) => {
        toolState.setFillColor('#' + color.toHex())
    }

    const onSave = () => {
        const toDataURL = canvasState.canvas.toDataURL()

        const a = document.createElement('a')

        a.href = toDataURL
        a.download = id + ".jpg"
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const setTool = (Tool) => {
        setActiveTool(Tool.name)
        toolState.setTool(new Tool(canvasState.canvas, canvasState.socket, canvasState.idSession, canvasState.idUser))
    }

    const getAciveToolStyle = (name, active) => {
        return name === active ? 'invert(33%) sepia(4%) saturate(2%) hue-rotate(340deg) brightness(91%) contrast(86%)' : 'none'
    }

    const onUndo = () => {
        canvasState.undo()

        canvasState.socket.send(JSON.stringify({
            idSession: canvasState.idSession,
            idUser: canvasState.idUser,
            method: 'undo'
        }))
    }

    const onRedo = () => {
        canvasState.redo()

        canvasState.socket.send(JSON.stringify({
            idSession: canvasState.idSession,
            idUser: canvasState.idUser,
            method: 'redo'
        }))
    }

    return (
        <div className='toolbar'>
            <button
                className='toolbar__btn brush'
                style={{filter: getAciveToolStyle('Brush', activeTool)}}
                onClick={() => setTool(Brush)}/>
            <button
                className='toolbar__btn rect'
                style={{filter: getAciveToolStyle('Rect', activeTool)}}
                onClick={() => setTool(Rect)}/>
            <button
                className='toolbar__btn circle'
                style={{filter: getAciveToolStyle('Circle', activeTool)}}
                onClick={() => setTool(Circle)}/>
            <button
                className='toolbar__btn eraser'
                style={{filter: getAciveToolStyle('Eraser', activeTool)}}
                onClick={() => setTool(Eraser)}/>
            <button
                className='toolbar__btn line'
                style={{filter: getAciveToolStyle('Line', activeTool)}}
                onClick={() => setTool(Line)}/>
            <ColorPicker defaultValue='black' onChange={onChangeColor} style={{marginLeft: '10px'}}/>
            <button className='toolbar__btn undo' onClick={onUndo}/>
            <button className='toolbar__btn redo' onClick={onRedo}/>
            <button className='toolbar__btn save' onClick={onSave}/>
        </div>
    );
};

export default Toolbar;