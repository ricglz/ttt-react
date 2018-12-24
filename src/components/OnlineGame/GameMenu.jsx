import React from 'react';
import PropTypes from 'prop-types';
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
    }
    this.joinGame = this.joinGame.bind(this);
  }

  componentDidMount() {
    const that = this;
    gamesReference().on('value', (snapshot) => {
      const games = snapshot.val();
      that.setState({ games });
    }, (err) => {
      alert(err.message);
    });
  }

  hostNewGame() {
    const { uid } = this.props.user;
    const newGame = fbInitialState(uid);
    const ref = gamesReference().push(newGame);
    this.setState({ gameId: ref.key });
  }

  joinGame(key) {
    const { uid } = this.props.user;
    boardReference(key).update({ guestUid: uid })
    this.setState({ gameId: key });
  }


  renderGames(games) {
    return Object.keys(games).map((key) => (
      <li key={key}>
        <button onClick={() => this.joinGame(key)}>{key}</button>
      </li>
    ));
  }

  render() {
    let { games, gameId } = this.state;
    let { uid } = this.props.user;
    return (
      <React.Fragment>
        { gameId ? (
            <OnlineGame gameId={gameId} userId={uid} />
          ) : (
            <React.Fragment>
              <ul>
                { this.renderGames(games) }
              </ul>
              <button onClick={() => this.hostNewGame()}>Host new game</button>
            </React.Fragment>
          )
        }
      </React.Fragment>
    )
  }
}

GameMenu.propTypes = {
  user: userPropType,
}

export default GameMenu;
