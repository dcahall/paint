import '../styles/settingbar.scss'
import React from 'react';

import toolState from "../store/toolState";

const SettingBar = () => {
    return (
        <div className='setting-bar'>
            <label>Ширина линии
                <input
                    id='line_width'
                    type='number'
                    min={1}
                    max={50}
                    defaultValue={1}
                    onChange={(e) => toolState.setLineWidth(e.target.value)}
                />
            </label>
            <label>
                Цвет обводки
                <input
                    id='stroke_color'
                    type='color'
                    onChange={(e) => toolState.setStrokeColor(e.target.value)}
                />
            </label>
        </div>
    );
};

export default SettingBar;