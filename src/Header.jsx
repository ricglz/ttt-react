import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h1>Single Player</h1>
        </div>
        <div className="col-12">
          <h2>Score</h2>
        </div>
        <div className="col-12">
          <div className="row justify-content-between">
            <div className="col xScore">
              <p> X's score: {this.props.xScore} </p>
            </div>
            <div className="col oScore">
              <p> O's score: {this.props.oScore} </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
