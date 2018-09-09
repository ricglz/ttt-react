import React, { Component } from 'react';
import BoardButton from './BoardButton';
import resetBoard from './ResetBoard';

class ButtonsFooter extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return(
      <div className="row justify-content-center">
        <BoardButton
          text="Reset"
          func={resetBoard}
        />
        <BoardButton
          text="Back"
          func={this.props.back}
        />
      </div>
    );
  }
}

export default ButtonsFooter;