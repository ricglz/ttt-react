import React, { Component } from 'react';
import Header from './Header';
import BigBoard from '../Board/BigBoard';
import ButtonsFooter from './ButtonsFooter';
import DifficultySelect from './DifficultySelect';
import {
  isOccupied,
  theresAWinner,
  constructorState,
  initialState,
  alertWinner,
} from '../../functions/HelperFunctions';
import makeMove, {
  playerMadeAMove,
  cleanVariables,
  aiMadeAMove,
} from '../../functions/Ai';

class Game extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = constructorState();
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.newGame = this.newGame.bind(this);
    this.changeScore = this.changeScore.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  CONSTANTS = {
    PLAYER1: 'X',
    PLAYER2: 'O',
  };

  canClick(board, id) {
    const currentValue = this.state.boardGame[board][id];
    if (isOccupied(currentValue)) return false;
    return board === this.state.currentBoard || this.state.currentBoard === -1;
  }

  handleSquareClick(board, id) {
    if (this.canClick(board, id)) {
      const boardCopy = [...this.state.boardGame];
      const newMoveNumber = this.state.moveNumber + 1;
      boardCopy[board][id] = this.currentTurn();
      const winner = theresAWinner(boardCopy[board]);
      if (winner) {
        alertWinner(winner);
        this.changeScore(winner);
        this.newGame();
      } else if (newMoveNumber === 81) {
        this.newGame();
      } else if (this.props.ai) {
        playerMadeAMove(board, boardCopy[board]);
        this.aiMove(boardCopy, id, newMoveNumber);
      } else {
        this.pvpMove(boardCopy, newMoveNumber, id);
      }
    }
  }

  handleChange(selectedOption) {
    const difficulty = selectedOption.value;
    this.setState({
      selectedOption,
      difficulty,
    });
    if (this.state.moveNumber >= 0) {
      this.newGame();
    }
  }

  aiMove(boardCopy, id, newMoveNumber) {
    const difficulty = this.state.difficulty;
    const aiMove = makeMove(boardCopy[id], id, difficulty);
    boardCopy[id][aiMove] = -1;
    const winner = theresAWinner(boardCopy[id]);
    if (winner) {
      alertWinner(winner);
      this.changeScore(winner);
      this.newGame();
    } else {
      aiMadeAMove(id, boardCopy[id]);
      this.setState({
        boardGame: boardCopy,
        moveNumber: newMoveNumber + 1,
        currentBoard: aiMove,
      });
    }
  }

  pvpMove(boardCopy, newMoveNumber, id) {
    this.setState({
      boardGame: boardCopy,
      moveNumber: newMoveNumber,
      currentBoard: id,
    });
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

  currentTurn() {
    return this.state.currentPlayer === this.CONSTANTS.PLAYER1 ? 1 : -1;
  }

  changeScore(value) {
    let newCount;
    if (value === -1) {
      newCount = this.state.oWins + 1;
      this.setState({
        oWins: newCount,
      });
    } else {
      newCount = this.state.xWins + 1;
      this.setState({
        xWins: newCount,
      });
    }
  }

  newGame() {
    cleanVariables();
    this.setState(initialState());
  }

  render() {
    let difficulty;
    if (this.props.ai) {
      difficulty = (
        <DifficultySelect
          selectedOption={this.state.selectedOption}
          handleChange={this.handleChange}
        />
      );
    } else {
      difficulty = <div />;
    }
    return (
      <div className="container text-center">
        <Header
          ai={this.props.ai}
          oScore={this.state.oWins}
          xScore={this.state.xWins}
        />
        <hr />
        <BigBoard
          handleClick={this.handleSquareClick}
          boardGame={this.state.boardGame}
          currentBoard={this.state.currentBoard}
        />
        <hr />
        {difficulty}
        <ButtonsFooter back={this.props.back} reset={this.newGame} />
      </div>
    );
  }
}

export default Game;
