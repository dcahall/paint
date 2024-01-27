import '../styles/settingbar.scss'
import React from 'react';

import {ColorPicker, InputNumber, Typography} from "antd";

import toolState from "../store/toolState";

const SettingBar = () => {
    return (
        <div className='setting-bar'>
            <Typography>Ширина линии</Typography>
            <InputNumber
                size='small'
                min={1}
                max={50}
                defaultValue={1}
                onChange={(value) => toolState.setLineWidth(value)}
            />
            <Typography>Цвет обводки</Typography>
                <ColorPicker defaultValue='black' onChange={(color) => toolState.setStrokeColor(color)}/>
        </div>
    );
};

export default SettingBar;