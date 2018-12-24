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
    gamesReference().orderByChild('guestUid').equalTo(-1).on('value', (snapshot) => {
      let games = snapshot.val();
      games = games || { };
      that.setState({ games });
    }, (err) => {
      NotificationManager.error(err.message);
    });
  }

  hostNewGame() {
    const { uid, name } = this.props.user; // eslint-disable-line react/destructuring-assignment
    const newGame = fbInitialState(uid, name);
    const ref = gamesReference().push(newGame);
    this.setState({ gameId: ref.key });
  }

  joinGame(key, hostUid) {
    const { uid } = this.props.user; // eslint-disable-line react/destructuring-assignment
    if (hostUid !== uid) {
      boardReference(key).update({ guestUid: uid });
    }
    this.setState({ gameId: key });
  }

  surrender({ guestUid, hostUid }) {
    const { uid } = this.props.user; // eslint-disable-line react/destructuring-assignment
    const { gameId } = this.state;
    if (uid === hostUid) {
      if (guestUid === -1) {
        boardReference(gameId).remove();
      } else {
        boardReference(gameId).update({
          hostUid: guestUid,
          guestUid: -1,
        });
      }
    } else {
      boardReference(gameId).update({ guestUid: -1 });
    }
    this.setState({ gameId: null });
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
    const { user, logOut } = this.props;
    const { uid } = user;
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
              <Button text="Log Out" func={logOut} />
            </div>
            <ul className="list-group">
              { this.renderGames(games) }
            </ul>
          </React.Fragment>
        )
        }
      </React.Fragment>
    );
  }
}

const Button = ({ text, func }) => (
  <div className="col text-center">
    <button className="btn btn-outline-dark" type="button" onClick={() => func()}>
      {text}
    </button>
  </div>
);

GameMenu.propTypes = {
  user: userPropType, // eslint-disable-line react/require-default-props
  logOut: PropTypes.func.isRequired,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};

export default GameMenu;
