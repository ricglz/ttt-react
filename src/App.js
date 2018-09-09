import React, { Component } from 'react';
import Home from './Home';
import './css/bootstrap.css'
import './css/home.css'
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
        <p> AI place</p>
      )
    } else if(this.state.pvp) {
      return (
        <p> PVP place </p>
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
