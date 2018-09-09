import React, {Component} from 'react';
import HomeButton from './HomeButton';

class Home extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return(
      <div className="container text-center">
        <div className = "row">
          <div className = "col">
            <h1>Home Page</h1>
          </div>
        </div>
        <hr></hr>
        <HomeButton
          func = {this.props.changeToAi}
          text = "Single Player"
        />
        <hr></hr>
        <HomeButton
          func = {this.props.changeToPvp}
          text = "Local Multiplayer"
        />
      </div>
    );
  }
}

export default Home;