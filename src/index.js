import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function ToggleButton(props) {
  return (
    <button className="toggle-button" onClick={() => props.onClick()}>Reverse Order</button>
  )
}

function Square(props) {
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
          this.renderSquare(i + (col * 3))
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        row: 0,
        col: 0,
        flag: 'X',
      }],
      xIsNext: true,
      stepNumber: 0,
      ascendingOrder: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        row: parseInt(i / 3) + 1,
        col: i % 3 + 1,
        flag: squares[i],
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      xIsNext: (step % 2) === 0,
      stepNumber: step,
    })
  }

  toggleOrder() {
    this.setState({
      ascendingOrder: !this.state.ascendingOrder
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const info = history[move];
      const desc = move ?
        'Go to move #' + move + '(' + info.row + ', ' + info.col + ', ' + info.flag + ')' : 'Go to game start';
      const textStyle = {
        'fontWeight': move === this.state.stepNumber ? 'bold' : ''
      };

      return (
        <li key={move}>
          <button style={textStyle} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    if (!this.state.ascendingOrder) {
      moves.reverse()
    }
    console.log(this.state.stepNumber)
    let status = winner ? 'The winner is ' + winner.flag : this.state.stepNumber === 9 ? 'Draw' : 'Next player: ' + (this.state.xIsNext ? "X" : "O");

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={winner ? winner.line : []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          {/* <button onClick={() => this.toggleOrder()}>Change Order</button> */}
        </div>
        <div className="other">
          <ToggleButton
            onClick={() => this.toggleOrder()}
          />
        </div>
      </div>
    );
  }
}

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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('app')
);

