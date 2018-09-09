import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = { cell: 0 };

  }

  render(){
    return (
      <div className="col-4 box">
        <p className="O">O</p>
      </div>
    );
  }
}

export default Cell;