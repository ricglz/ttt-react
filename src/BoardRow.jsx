import React, { Component } from 'react';
import Board from './Board';

class BoardRow extends Component {
  render(){
    return (
      <div className="row">
        <Board/>
        <Board/>
        <Board/>
      </div>
    );
  }
}

export default BoardRow;