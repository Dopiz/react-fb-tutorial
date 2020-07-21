import React from 'react';
import './style.css';

const Square = (props) => {
    const buttonBackground = {
        'backgroundColor': props.isWinner ? '#DF1614' : ''
    };

    return (
        <button
            style={buttonBackground}
            className="square"
            onClick={props.onClick} >
            {props.value}
        </button>
    );
}

export default Square;