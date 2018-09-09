import React, { Component } from 'react';
import changeScore from './ChangeScore';

class Header extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      oWins: 0,
      xWins: 0
    };
    changeScore.bind(this);
  }

  render() {
    return(
      <div className="row">
        <div className="col-12">
          <h1>Single Player</h1>
        </div>
        <div className="col-12">
          <h2>Score</h2>
        </div>
        <div className="col-12">
          <div className="row justify-content-between">
            <div className="col-2 xScore">
              <p> X's score: {this.state.xWins} </p>
            </div>
            <div className="col-2 oScore">
              <p> O's score: {this.state.oWins} </p>
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

export default Header;