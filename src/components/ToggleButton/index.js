import React from 'react';

const ToggleButton = (props) => {
    return (
        <button
            className="toggle-button"
            onClick={() => props.onClick()}
        >
            Reverse Order
        </button>
    )
}

export default ToggleButton;