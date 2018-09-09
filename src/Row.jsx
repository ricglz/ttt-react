import React, { Component } from 'react';
import Cell from './Cell';

class Row extends Component {
  render(){
    return (
      <div className="row cell-row">
        <Cell/>
        <Cell/>
        <Cell/>
      </div>
    );
  }
}

export default Row;