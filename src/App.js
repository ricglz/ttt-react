import React, { Component } from 'react';
import './css/bootstrap.css'
import './css/home.css'
import './css/fonts.css'

class App extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      ai: false,
      pvp: false
    };
  }

  render() {
    return (
      <div className="container text-center">
        <div className = "row">
          <div className = "col">
            <h1>Home Page</h1>
          </div>
        </div>
        <hr></hr>
        <div className="row justify-content-center">
          <button type="button" className="btn"> Single Player </button>
        </div>
        <hr></hr>
        <div className="row justify-content-center">
          <button type="button" className="btn"> Local multiplayer </button>
        </div>
      </div>
    );
  }
}

export default App;
