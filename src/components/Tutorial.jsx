import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import exImage1 from "../images/example1.gif";
import exImage2 from "../images/example2.png";
import BoardButton from "./BoardButton";

const Image = props => {
  return (
    <div className="col">
      <img src={props.src} className="img-fluid" alt="example" />
    </div>
  );
};

export default class Tutorial extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    let paragraphsTitles = [
      "tutorial.first",
      "tutorial.second",
      "tutorial.third"
    ];
    let paragraphs = paragraphsTitles.map(title => (
      <p key={title}>
        <FormattedMessage key={title} id={title} />
      </p>
    ));
    return (
      <div className="container">
        <div className="row text-center pb-3 border-bottom">
          <div className="col">
            <h2>
              <FormattedMessage id="shared.tutorial" />
            </h2>
          </div>
        </div>
        <div className="pt-3"></div>
        {paragraphs}
        <div className="row text-center">
          <Image src={exImage1} />
        </div>
        <p>
          <FormattedMessage id="tutorial.fourth" />
        </p>
        <div className="row text-center">
          <Image src={exImage2} />
        </div>
        <p>
          <FormattedMessage id="tutorial.fifth" />
        </p>
        <div className="row text-center">
          <BoardButton text="shared.back" func={this.props.back} />
        </div>
      </div>
    );
  }
}
