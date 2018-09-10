import React, { Component } from 'react';
import Header from './Header';
import BigBoard from './BigBoard';
import ButtonsFooter from './ButtonsFooter';

class Game extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = this.initialState();
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  CONSTANTS = {
    PLAYER1: "Player 1",
    PLAYER2: "COM"
  };

  isOccupied(value) {
    return value !== 0; 
  }

  canClick(board, id) {
    const currentValue = this.state.boardGame[board][id];
    if (this.isOccupied(currentValue)) return false;
    return board === this.state.currentBoard || this.state.currentBoard === -1;
  }

  handleSquareClick(board, id) {
    if (this.canClick(board, id)) {
      console.log("Id " + id);
      console.log("Board " + board);
      console.log("CBoard " +this.state.currentBoard);
      var boardCopy = [...this.state.boardGame];
      var newMoveNumber = this.state.moveNumber + 1;
      boardCopy[board][id] = this.currentTurn();
      if (this.existsWinner(board)) {
        this.newGame();
      }
      else if(newMoveNumber === 81){
        this.newGame();
      }
      else {
        this.setState({
          boardGame: boardCopy,
          moveNumber: newMoveNumber,
          currentBoard: id
        })
        if (this.state.currentPlayer === this.CONSTANTS.PLAYER1) {
          this.setState({
            currentPlayer: this.CONSTANTS.PLAYER2,
          });
        } else {
          this.setState({
            currentPlayer: this.CONSTANTS.PLAYER1,
          });
        }
      }
    }
  }

  currentTurn() {
    return this.state.currentPlayer === this.CONSTANTS.PLAYER1 ? 1 : -1
  }

  existsWinner(board) {
    return false;
  }

  newBoard() {
    return [[0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]];
  }

  initialState() {
    return {
      boardGame: this.newBoard(),
      currentPlayer: this.CONSTANTS.PLAYER1,
      moveNumber: 0,
      currentBoard: -1
    }
  }

  newGame() {
    this.setState(this.initialState());
  }

  render() {
    return (
      <div className="container text-center">
        <Header/>
        <hr/>
        <BigBoard
          handleClick={this.handleSquareClick}
          boardGame={this.state.boardGame}
          currentBoard={this.state.currentBoard}
        />
        <hr/>
        <ButtonsFooter
          back={this.props.back}
          reset={this.newGame}
        />
      </div>
    );
  }
}

export default Game;
