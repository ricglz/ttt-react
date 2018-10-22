import React from "react";
import { FormattedMessage } from "react-intl";

const HomeButton = props => (
  <div className="row justify-content-center border-top py-3">
    <button type="button" onClick={props.func} className="btn btn-home">
      <FormattedMessage id={props.text} />
    </button>
  </div>
);

export default HomeButton;
