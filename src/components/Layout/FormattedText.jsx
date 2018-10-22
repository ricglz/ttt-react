import React from "react";
import { FormattedMessage } from "react-intl";

export const FormattedParagraph = props => (
  <p>
    <FormattedMessage id={props.locale} />
  </p>
);

export const FormattedHeader = props => (
  <FormattedMessage id={props.locale} >
    {txt => <h1>{txt}</h1>}
  </FormattedMessage>
)

export const FormattedHeader2 = props => (
  <h2>
    <FormattedMessage id={props.locale} />
  </h2>
)
