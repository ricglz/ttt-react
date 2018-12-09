import React from 'react';
import { FormattedMessage } from 'react-intl';

const DefaultButton = props => (
  <div className="col">
    <button className="btn btn-game btn-lg btn-danger" onClick={props.func}>
      <FormattedMessage id={props.text} default="Back" />
    </button>
  </div>
);

export default DefaultButton;
