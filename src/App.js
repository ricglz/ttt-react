import React, { Component } from 'react';
import Home from './Home';
import Game from './Game';
import './css/bootstrap.css'
import './css/home.css'
import './css/board.css'
import './css/fonts.css'

class App extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = this.originalState();
    this.changeToAi = this.changeToAi.bind(this);
    this.changeToHome = this.changeToHome.bind(this);
    this.changeToPvp = this.changeToPvp.bind(this);
  }

  changeToAi() {
    this.setState({
      ai: true,
    });
  }

  changeToPvp() {
    this.setState({
      pvp: true
    });
  }
  changeToHome() {
    this.setState(this.originalState());
  }

  originalState() {
    return {
      ai: false,
      pvp: false
    };
  }

  render() {
    if (this.state.ai) {
      return (
        <Game
          ai = {true}
          back = {this.changeToHome}
        />
      )
    } else if(this.state.pvp) {
      return (
        <Game
          ai = {false}
          back = {this.changeToHome}
        />
      );
    }
    else {
      return (
        <Home
          changeToAi = {this.changeToAi}
          changeToPvp = {this.changeToPvp}
        />
      );
    }
  }
}

export default App;
