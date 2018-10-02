import React, { Component } from "react";
import HomeButton from "./HomeButton";
import { FormattedMessage } from "react-intl";

class Home extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <h1>
              <FormattedMessage id="homePage.title" default="Home Page" />
            </h1>
          </div>
        </div>
        <HomeButton func={this.props.changeToAi} text="shared.sp" />
        <HomeButton func={this.props.changeToPvp} text="shared.mp" />
        <HomeButton func={this.props.changeToTutorial} text="shared.tutorial" />
      </div>
    );
  }
}

export default Home;
