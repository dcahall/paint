import '../styles/toolbar.scss'
import React from 'react';

import toolState from "../store/toolState";
import canvasState from "../store/canvasState";

import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import Line from "../tools/Line";

const Toolbar = () => {

    const onChangeColor = (e) => {
        toolState.setFillColor(e.target.value)
        toolState.setStrokeColor(e.target.value)
    }


    return (
        <div className='toolbar'>
            <button className='toolbar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas))}/>
            <button className='toolbar__btn rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas))}/>
            <button className='toolbar__btn circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas))}/>
            <button className='toolbar__btn eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}/>
            <button className='toolbar__btn line' onClick={() => toolState.setTool(new Line(canvasState.canvas))}/>
            <input type='color' className='toolbar__btn' onChange={onChangeColor}/>
            <button className='toolbar__btn undo'/>
            <button className='toolbar__btn redo'/>
            <button className='toolbar__btn save'/>
        </div>
    );
};

export default Toolbar;