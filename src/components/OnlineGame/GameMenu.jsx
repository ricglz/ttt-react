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
    const { uid } = this.props.user; // eslint-disable-line react/destructuring-assignment
    const newGame = fbInitialState(uid);
    const ref = gamesReference().push(newGame);
    this.setState({ gameId: ref.key });
  }

  joinGame(key) {
    const { uid } = this.props.user; // eslint-disable-line react/destructuring-assignment
    boardReference(key).update({ guestUid: uid });
    this.setState({ gameId: key });
  }

  surrender(gameState) {
    const { uid } = this.props.user; // eslint-disable-line react/destructuring-assignment
    const { gameId } = this.state;
    const { guestUid, hostuid } = gameState;
    if (uid === hostuid) {
      if (guestUid === -1) {
        boardReference(gameId).remove();
      } else {
        boardReference(gameId).update({
          hostuid: guestUid,
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
    const { games, gameId } = this.state;
    const { user, logOut } = this.props;
    const { uid } = user;
    return (
      <React.Fragment>
        { gameId ? (
          <OnlineGame gameId={gameId} userId={uid} />
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
