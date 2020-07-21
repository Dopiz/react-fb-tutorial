import React from 'react';
import Square from '../Square'
import './style.css';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                isWinner={this.props.winnerSquares.includes(i) ? true : false}
                onClick={() => this.props.onClick(i)}
            />);
    }

    columns(i) {
        return (
            [0, 1, 2].map((col) => {
                return (
                    this.renderSquare(col + (i * 3))
                );
            })
        );
    }

    rows() {
        return (
            [0, 1, 2].map((step) => {
                return (
                    <div key={step} className="board-row">
                        {this.columns(step)}
                    </div>
                );
            })
        );
    }

    render() {
        return (
            <div>
                {this.rows()}
            </div>
        );
    }
}

export default Board;