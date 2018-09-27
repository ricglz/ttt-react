import React, { Component } from "react";
import HomeButton from "./HomeButton";
import { FormattedMessage } from "react-intl";

class Home extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    let spMessage = <FormattedMessage id="homePage.sp" default="Single Player" />
    let mpMessage = <FormattedMessage id="homePage.mp" default="Local Multiplayer" />
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <h1>
              <FormattedMessage id="homePage.title" default="Home Page" />
            </h1>
          </div>
        </div>
        <hr />
        <HomeButton func={this.props.changeToAi} text={spMessage} />
        <hr />
        <HomeButton func={this.props.changeToPvp} text={mpMessage} />
      </div>
    );
  }
}

export default Home;
