import React from 'react';

import '../styles/canvas.scss'

const Canvas = () => {
    return (
        <div className='canvas'>
            <canvas height={400} width={500}></canvas>
        </div>
    );
};

export default Canvas;