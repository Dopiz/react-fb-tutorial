import React, { useState } from 'react';
import Board from '../Board'
import ToggleButton from '../ToggleButton'
import './index.css';

const Game = () => {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
        row: 0,
        col: 0,
        flag: 'X',
    }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const [ascendingOrder, setAscendingOrder] = useState(true);

    const handleClick = (i) => {
        const tempHistory = history.slice(0, stepNumber + 1);
        const current = tempHistory[tempHistory.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(tempHistory.concat([{
            squares: squares,
            row: parseInt(i / 3) + 1,
            col: i % 3 + 1,
            flag: squares[i],
        }]));
        setXIsNext(!xIsNext);
        setStepNumber(tempHistory.length);
    }

    const jumpTo = (step) => {
        setXIsNext((step % 2) === 0);
        setStepNumber(step);
    }

    const toggleOrder = () => {
        setAscendingOrder(!ascendingOrder);
    }

    const tempHistory = history;
    const current = tempHistory[stepNumber];
    const winner = calculateWinner(current.squares)
    let status = winner ? 'The winner is ' + winner.flag : stepNumber === 9 ? 'Draw' : 'Next player: ' + (xIsNext ? "X" : "O");
    const moves = tempHistory.map((step, move) => {
        const info = tempHistory[move];
        const desc = move ? 'Go to move #' + move + '(' + info.row + ', ' + info.col + ', ' + info.flag + ')' : 'Go to game start';
        const textStyle = { 'fontWeight': move === stepNumber ? 'bold' : '' };

        return (
            <li key={move}>
                <button style={textStyle} onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    if (!ascendingOrder) {
        moves.reverse()
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    winnerSquares={winner ? winner.line : []}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            <div className="other">
                <ToggleButton
                    onClick={() => toggleOrder()}
                />
            </div>
        </div>
    );
}

// export default class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             history: [{
//                 squares: Array(9).fill(null),
//                 row: 0,
//                 col: 0,
//                 flag: 'X',
//             }],
//             xIsNext: true,
//             stepNumber: 0,
//             ascendingOrder: true,
//         }
//     }

//     handleClick(i) {
//         const history = this.state.history.slice(0, this.state.stepNumber + 1);
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         this.setState({
//             history: history.concat([{
//                 squares: squares,
//                 row: parseInt(i / 3) + 1,
//                 col: i % 3 + 1,
//                 flag: squares[i],
//             }]),
//             xIsNext: !this.state.xIsNext,
//             stepNumber: history.length,
//         });
//     }

//     jumpTo(step) {
//         this.setState({
//             xIsNext: (step % 2) === 0,
//             stepNumber: step,
//         })
//     }

//     toggleOrder() {
//         this.setState({
//             ascendingOrder: !this.state.ascendingOrder
//         })
//     }

//     render() {
//         const history = this.state.history;
//         const current = history[this.state.stepNumber];
//         const winner = calculateWinner(current.squares)

//         const moves = history.map((step, move) => {
//             const info = history[move];
//             const desc = move ?
//                 'Go to move #' + move + '(' + info.row + ', ' + info.col + ', ' + info.flag + ')' : 'Go to game start';
//             const textStyle = {
//                 'fontWeight': move === this.state.stepNumber ? 'bold' : ''
//             };

//             return (
//                 <li key={move}>
//                     <button style={textStyle} onClick={() => this.jumpTo(move)}>{desc}</button>
//                 </li>
//             )
//         })

//         if (!this.state.ascendingOrder) {
//             moves.reverse()
//         }

//         let status = winner ? 'The winner is ' + winner.flag : this.state.stepNumber === 9 ? 'Draw' : 'Next player: ' + (this.state.xIsNext ? "X" : "O");

//         return (
//             <div className="game">
//                 <div className="game-board">
//                     <Board
//                         squares={current.squares}
//                         winnerSquares={winner ? winner.line : []}
//                         onClick={(i) => this.handleClick(i)}
//                     />
//                 </div>
//                 <div className="game-info">
//                     <div>{status}</div>
//                     <ol>{moves}</ol>
//                 </div>
//                 <div className="other">
//                     <ToggleButton
//                         onClick={() => this.toggleOrder()}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c]) {
            return {
                'flag': squares[a],
                'line': lines[i]
            }
        }
    }
    return null
}

export default Game;