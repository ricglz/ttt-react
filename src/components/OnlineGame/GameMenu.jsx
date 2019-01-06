import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import OnlineGame from './OnlineGame';
import { gamesReference, boardReference } from '../../firebase/firebase';
import { userPropType, historyProps } from '../../constants/props';
import { fbInitialState, initialState } from '../../functions/HelperFunctions';

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
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    const { user, history } = this.props;
    if (Object.keys(user).length === 0) {
      history.push('/login');
      return;
    }
    gamesReference().orderByChild('guestUid').equalTo(-1).on('value', (snapshot) => {
      let games = snapshot.val();
      games = games || { };
      this.setState({ games });
    }, (err) => {
      NotificationManager.error(err.message);
    })
      .bind(this);
  }

  hostNewGame() {
    const { uid, name } = this.props.user; // eslint-disable-line react/destructuring-assignment
    const newGame = fbInitialState(uid, name);
    const ref = gamesReference().push(newGame);
    this.setState({ gameId: ref.key });
  }

  joinGame(gameId, hostUid) {
    const { uid } = this.props.user; // eslint-disable-line react/destructuring-assignment
    if (hostUid !== uid) {
      boardReference(gameId).update({ guestUid: uid });
    }
    this.setState({ gameId });
  }

  surrender({ guestUid, hostUid }) {
    const { uid } = this.props.user; // eslint-disable-line react/destructuring-assignment
    const { gameId } = this.state;
    if (uid === hostUid) {
      if (guestUid === -1) {
        boardReference(gameId).remove();
      } else {
        let state = initialState();
        state['hostUid'] = guestUid;
        state['guestUid'] = -1;
        state['nextPlayerUid'] = guestUid;
        boardReference(gameId).update(state);
      }
    } else {
      let state = initialState();
      state['guestUid'] = -1;
      state['nextPlayerUid'] = hostUid;
      boardReference(gameId).update(state);
    }
    this.setState({ gameId: null });
  }

  handleLogOut() {
    const { logOut, history } = this.props;
    logOut();
    history.push('/login');
  }

  renderGames(games) {
    return Object.keys(games).map((key) => {
      const { hostUid, hostName } = games[key];
      return (
        <li className="list-group-item" key={key}>
          <span>{hostName}</span>
          <button
            className="btn ml-5 btn-outline-dark"
            type="button"
            onClick={() => this.joinGame(key, hostUid)}
          >
            Join Game
          </button>
        </li>
      );
    });
  }

  render() {
    const { games, gameId } = this.state;
    const { uid } = this.props.user; // eslint-disable-line react/destructuring-assignment
    return (
      <React.Fragment>
        { gameId ? (
          <OnlineGame gameId={gameId} userId={uid} back={this.surrender} />
        ) : (
          <React.Fragment>
            <div className="row justify-content-center">
              <h1>Rooms</h1>
            </div>
            <hr />
            <div className="row">
              <Button text="Host new game" func={this.hostNewGame} />
              <Button text="Log Out" func={this.handleLogOut} />
            </div>
            <ul className="list-group">
              { this.renderGames(games) }
            </ul>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const Button = ({ text, func }) => (
  <div className="col text-center">
    <button className="btn btn-outline-dark" type="button" onClick={func}>
      {text}
    </button>
  </div>
);

GameMenu.propTypes = {
  user: userPropType, // eslint-disable-line react/require-default-props
  logOut: PropTypes.func.isRequired,
  history: historyProps.isRequired,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};

export default GameMenu;
