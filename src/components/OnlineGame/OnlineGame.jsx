import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import BigBoard from '../Board/BigBoard';
import ButtonsFooter from '../Game/ButtonsFooter';
import {
  isOccupied,
  theresAWinner,
  fbInitialState,
  initialState,
  alertWinner,
} from '../../functions/HelperFunctions';
import { boardReference } from '../../firebase/firebase';

class OnlineGame extends Component {
  CONSTANTS = {
    PLAYER1: 'X',
    PLAYER2: 'O',
  }

  constructor(props) {
    super(props);
    this.state = fbInitialState();
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.newGame = this.newGame.bind(this);
    this.changeScore = this.changeScore.bind(this);
  }

  componentDidMount() {
    const that = this;
    const { gameId } = this.props;
    boardReference(gameId).on('value', (snapshot) => {
      that.setState(snapshot.val());
    }, (err) => {
      NotificationManager.error(err.message);
    });
  }

  updateFirebase(obj) {
    const { gameId } = this.props,
          timestamp = Date.now();
    boardReference(gameId).update(Object.assign(obj, {timestamp}));
  }

  canClick(board, id) {
    const {
      boardGame, currentBoard, nextPlayerUid,
    } = this.state;
    const { userId } = this.props;
    const currentValue = boardGame[board][id];
    if (isOccupied(currentValue)
      || nextPlayerUid !== userId
    ) return false;
    return board === currentBoard || currentBoard === -1;
  }

  handleSquareClick(board, id) {
    const { boardGame, moveNumber } = this.state;
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
      } else {
        this.pvpMove(boardCopy, newMoveNumber, id);
      }
    }
  }

  pvpMove(boardGame, moveNumber, currentBoard) {
    let {
      currentPlayer, hostUid, guestUid, nextPlayerUid, // eslint-disable-line prefer-const
    } = this.state;
    const { PLAYER1, PLAYER2 } = this.CONSTANTS;

    currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
    nextPlayerUid = nextPlayerUid === hostUid ? guestUid : hostUid;

    const state = {
      boardGame,
      moveNumber,
      currentBoard,
      currentPlayer,
      nextPlayerUid,
    };

    this.updateFirebase(state);
  }

  currentTurn() {
    const { currentPlayer } = this.state;
    return currentPlayer === this.CONSTANTS.PLAYER1 ? 1 : -1;
  }

  changeScore(value) {
    let { oWins, xWins } = this.state;
    if (value === -1) {
      oWins += 1;
    } else {
      xWins += 1;
    }
    const newState = { oWins, xWins };
    this.updateFirebase(newState);
  }

  newGame() {
    this.updateFirebase(initialState());
  }

  render() {
    const { back } = this.props;
    const { boardGame, currentBoard } = this.state;
    return (
      <div className="container text-center">
        <BigBoard
          handleClick={this.handleSquareClick}
          boardGame={boardGame}
          currentBoard={currentBoard}
        />
        <hr />
        <ButtonsFooter back={back} reset={this.newGame} />
      </div>
    );
  }
}

OnlineGame.propTypes = {
  back: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default OnlineGame;
