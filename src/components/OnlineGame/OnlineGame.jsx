import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import { FormattedMessage } from 'react-intl';
import BigBoard from '../Board/BigBoard';
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
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    const { gameId } = this.props;
    boardReference(gameId).on('value', (snapshot) => {
      this.setState(snapshot.val());
    }, (err) => {
      NotificationManager.error(err.message);
    }).bind(this);
  }

  updateFirebase(obj) {
    const { gameId } = this.props;
    const timestamp = Date.now();
    boardReference(gameId).update(Object.assign(obj, { timestamp }));
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

  handleBack() {
    const { back } = this.props;
    back(this.state);
  }

  newGame() {
    this.updateFirebase(initialState());
  }

  render() {
    const { boardGame, currentBoard, guestUid } = this.state;
    return (
      <React.Fragment>
        { guestUid === -1 ? (
          <h1 className="text-center"> Please wait until someone enters the room </h1>
        ) : (
          <div className="container text-center">
            <BigBoard
              handleClick={this.handleSquareClick}
              boardGame={boardGame}
              currentBoard={currentBoard}
            />
            <hr />
            <ButtonsFooter back={this.handleBack} reset={this.newGame} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const ButtonsFooter = ({ reset, back }) => (
  <div className="row justify-content-center">
    <div className="col">
      <button type="button" className="btn btn-game btn-lg btn-danger" onClick={reset}>
        <FormattedMessage id="game.reset" default="Back" />
      </button>
    </div>
    <div className="col">
      <button type="button" className="btn btn-game btn-lg btn-danger" onClick={back}>
        <FormattedMessage id="shared.back" default="Back" />
      </button>
    </div>
  </div>
);

ButtonsFooter.propTypes = {
  reset: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

OnlineGame.propTypes = {
  back: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default OnlineGame;
