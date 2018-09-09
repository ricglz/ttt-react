import React, {Component} from 'react';

class HomeButton extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return(
      <div className="row justify-content-center">
        <button type="button" onClick = {this.props.func} className="btn"> 
          {this.props.text} 
        </button>
      </div>
    );
  }
}

export default HomeButton;