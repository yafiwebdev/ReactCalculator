import React from 'react';

const Display = props => (
    <div id="Display">
        <div id="Operation">
            <span>{props.operation}</span>
        </div>
        <div id="Output">
            <span>{props.output}</span>
        </div>
    </div>
);

export default Display;