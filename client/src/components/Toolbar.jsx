import '../styles/toolbar.scss'

import React from 'react';
import {ColorPicker} from "antd";

import toolState from "../store/toolState";
import canvasState from "../store/canvasState";

import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import Line from "../tools/Line";

const Toolbar = () => {

    const onChangeColor = (color) => {
        toolState.setFillColor(color)
        toolState.setStrokeColor(color)
    }

    const setTool = (Tool) => {
        toolState.setTool(new Tool(canvasState.canvas, canvasState.socket, canvasState.idSession, canvasState.idUser))
    }

    return (
        <div className='toolbar'>
            <button className='toolbar__btn brush' onClick={() => setTool(Brush)}/>
            <button className='toolbar__btn rect' onClick={() => setTool(Rect)}/>
            <button className='toolbar__btn circle' onClick={() => setTool(Circle)}/>
            <button className='toolbar__btn eraser' onClick={() => setTool(Eraser)}/>
            <button className='toolbar__btn line' onClick={() => setTool(Line)}/>
            <ColorPicker defaultValue='black' onChange={onChangeColor}/>
            <button className='toolbar__btn undo' onClick={() => canvasState.undo()}/>
            <button className='toolbar__btn redo' onClick={() => canvasState.redo()}/>
            <button className='toolbar__btn save'/>
        </div>
    );
};

export default Toolbar;