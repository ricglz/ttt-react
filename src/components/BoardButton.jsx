import React, { Component } from "react";

class BoardButton extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="col">
        <button
          className="btn btn-game btn-lg btn-danger"
          onClick={this.props.func}
        >
          <p>{this.props.text}</p>
        </button>
      </div>
    );
  }
}

export default BoardButton;
