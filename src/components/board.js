import React from 'react';
import Square from './square';

class Board extends React.Component {
    createBoard() {
      const board = [];
      let squareCounter = 0;

      for(let i = 0; i < 3; ++i) {
        const columns = []
        for(let j = 0; j < 3; ++j) {
          columns.push(this.renderSquare(squareCounter++));
        }
        board.push(<div key={i} className="board-row">{columns}</div>);
      }

    return board;
    }

    renderSquare(i) {
      return (
        <Square 
            value={this.props.squares[i]}
            onClick= {() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return <div>{this.createBoard()}</div>;
    }
  }

  export default Board;