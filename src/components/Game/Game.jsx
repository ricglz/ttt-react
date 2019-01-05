import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  CONSTANTS = {
    PLAYER1: 'X',
    PLAYER2: 'O',
  }

  constructor(props) {
    super();
    this.props = props;
    this.state = constructorState();
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.newGame = this.newGame.bind(this);
    this.changeScore = this.changeScore.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  canClick(board, id) {
    const { boardGame, currentBoard } = this.state;
    const currentValue = boardGame[board][id];
    if (isOccupied(currentValue)) return false;
    return board === currentBoard || currentBoard === -1;
  }

  handleSquareClick(board, id) {
    const { boardGame, moveNumber } = this.state;
    const { ai } = this.props;
    if (this.canClick(board, id)) {
      const boardCopy = [...boardGame];
      const newMoveNumber = moveNumber + 1;
      boardCopy[board][id] = this.currentTurn();
      const winner = theresAWinner(boardCopy[board]);
      if (winner) {
        alertWinner(winner);
        this.changeScore(winner);
        this.newGame();
      } else if (newMoveNumber === 81) {
        this.newGame();
      } else if (ai) {
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
    const { moveNumber } = this.state;
    if (moveNumber >= 0) {
      this.newGame();
    }
  }

  aiMove(boardCopy, id, newMoveNumber) {
    const { difficulty } = this.state;
    const board = boardCopy;
    const aiMove = makeMove(board[id], id, difficulty);
    board[id][aiMove] = -1;
    const winner = theresAWinner(board[id]);
    if (winner) {
      alertWinner(winner);
      this.changeScore(winner);
      this.newGame();
    } else {
      aiMadeAMove(id, board[id]);
      this.setState({
        boardGame: board,
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
    const { currentPlayer } = this.state;
    if (currentPlayer === this.CONSTANTS.PLAYER1) {
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
    const { currentPlayer } = this.state;
    return currentPlayer === this.CONSTANTS.PLAYER1 ? 1 : -1;
  }

  changeScore(value) {
    if (value === -1) {
      this.setState(({ oWins }) => ({
        oWins: oWins + 1,
      }));
    } else {
      this.setState(({ xWins }) => ({
        xWins: xWins + 1,
      }));
    }
  }

  newGame() {
    cleanVariables();
    this.setState(initialState());
  }

  render() {
    const { ai } = this.props;
    const {
      selectedOption, oWins, xWins, boardGame, currentBoard,
    } = this.state;
    return (
      <div className="container text-center">
        <Header ai={ai} oScore={oWins} xScore={xWins} />
        <hr />
        <BigBoard
          handleClick={this.handleSquareClick}
          boardGame={boardGame}
          currentBoard={currentBoard}
        />
        <hr />
        {ai && (
        <DifficultySelect
          selectedOption={selectedOption}
          handleChange={this.handleChange}
        />
        )}
        <ButtonsFooter back="/" reset={this.newGame} />
      </div>
    );
  }
}

Game.propTypes = {
  ai: PropTypes.bool.isRequired,
};

export default Game;
