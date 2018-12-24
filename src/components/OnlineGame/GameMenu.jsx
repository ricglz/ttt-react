import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import OnlineGame from './OnlineGame';
import { gamesReference, boardReference } from '../../firebase/firebase';
import { userPropType } from '../../constants/props';
import { fbInitialState } from '../../functions/HelperFunctions';

class GameMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: { },
      gameId: null,
    };
    this.joinGame = this.joinGame.bind(this);
    this.hostNewGame = this.hostNewGame.bind(this);
    this.surrender = this.surrender.bind(this);
  }

  componentDidMount() {
    const that = this;
    gamesReference().on('value', (snapshot) => {
      const games = snapshot.val();
      that.setState({ games });
    }, (err) => {
      NotificationManager.error(err.message);
    });
  }

  hostNewGame() {
    const { uid } = this.props.user, // eslint-disable-line react/destructuring-assignment
          newGame = fbInitialState(uid),
          ref = gamesReference().push(newGame);
    this.setState({ gameId: ref.key });
  }

  joinGame(key) {
    const { uid } = this.props.user; // eslint-disable-line react/destructuring-assignment
    boardReference(key).update({ guestUid: uid });
    this.setState({ gameId: key });
  }

  surrender({ guestUid, hostUid }) {
    const { uid } = this.props.user, // eslint-disable-line react/destructuring-assignment
          { gameId } = this.state;
    if (uid === hostUid) {
      if (guestUid === -1) {
        boardReference(gameId).remove();
      } else {
        boardReference(gameId).update({
          hostUid: uid,
          guestUid: -1,
        });
      }
    } else {
      boardReference(gameId).update({ guestUid: -1 });
    }
    this.setState({ gameId: null });
  }

  renderGames(games) {
    return Object.keys(games).map(key => (
      <li key={key}>
        <button type="button" onClick={() => this.joinGame(key)}>{key}</button>
      </li>
    ));
  }

  render() {
    const { games, gameId } = this.state,
          { user, logOut } = this.props,
          { uid } = user;
    return (
      <React.Fragment>
        { gameId ? (
          <OnlineGame gameId={gameId} userId={uid} back={this.surrender} />
        ) : (
          <React.Fragment>
            <ul>
              { this.renderGames(games) }
            </ul>
            <button type="button" onClick={() => this.hostNewGame()}>Host new game</button>
            <button type="button" onClick={() => logOut()}>Log Out</button>
          </React.Fragment>
        )
        }
      </React.Fragment>
    );
  }
}

GameMenu.propTypes = {
  user: userPropType, // eslint-disable-line react/require-default-props
  logOut: PropTypes.func.isRequired,
};

export default GameMenu;
