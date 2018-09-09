import React, { Component } from 'react';
import Row from './Row';

class Board extends Component {
  render(){
    return (
      <div className="col-4 big-box">
        <Row/>
        <Row/>
        <Row/>
      </div>
    );
  }
}

export default Board;