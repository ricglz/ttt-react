import React, { Component } from 'react';
import BoardRow from './BoardRow';

class BigBoard extends Component {
  render(){
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <BoardRow/>
          <BoardRow/>
          <BoardRow/>
        </div>
      </div>
    );
  }
}

export default BigBoard;