import React from 'react';
import Board from './board';

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares:Array(9).fill(null),
        }],
        currentStepNumber: 0,
        xIsNext: true,
      };
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (calculateWinner(squares).winner || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          currentLocation: getLocation(i),
          stepNumber: history.length,
        }]),
        xIsNext: !this.state.xIsNext,
        currentStepNumber: history.length,
      });
    }

    jumpTo(step) {
      this.setState({
        currentStepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.currentStepNumber];
      const {winner, winningSquares} = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
        const desc = step.stepNumber ? `Go to move #${step.stepNumber}` : 'Go to game start';
        const classButton = move === this.state.currentStepNumber ? 'bold' : '';
        
        return (
          <li key={move}>
            <button className={`${classButton} button`} onClick={() => this.jumpTo(move)}>{`${desc} ${currentLocation}`}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else if (history.length === 10) {
        status = 'Draw. No one wins.'
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              winnerSquares={winningSquares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================

  // helper function to calculate the winner
  function calculateWinner(squares) {
    // types of wins:
    const lines = [
      [0, 1, 2], // across top
      [3, 4, 5], // across middle
      [6, 7, 8], // across bottom
      [0, 3, 6], // down left
      [1, 4, 7], // down middle
      [2, 5, 8], // down right
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {winner: squares[a], winningSquares : lines[i]};
      }
    }
    return { winner: null, winningSquares: null };
  }

  // maps the location (row and col) of a square to its number
  const getLocation = (move) => {
    const locationMap = {
      0: 'row: 1, col: 1',
      1: 'row: 1, col: 2',
      2: 'row: 1, col: 3',
      3: 'row: 2, col: 1',
      4: 'row: 2, col: 2',
      5: 'row: 2, col: 3',
      6: 'row: 3, col: 1',
      7: 'row: 3, col: 2',
      8: 'row: 3, col: 3',
    };
  
    return locationMap[move];
  };

  export default Game;