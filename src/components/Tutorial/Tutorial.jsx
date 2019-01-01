import React from 'react';
import PropTypes from 'prop-types';
import exImage1 from '../../images/example1.gif';
import exImage2 from '../../images/example2.png';
import DefaultButton from '../Layout/DefaultButton';
import { FormattedParagraph, FormattedHeader2 } from '../Layout/FormattedText';

const Image = ({ src }) => (
  <div className="col">
    <img src={src} className="img-fluid" alt="example" />
  </div>
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

function renderParagraphs() {
  const paragraphsTitles = [
    'tutorial.first',
    'tutorial.second',
    'tutorial.third',
  ];
  return paragraphsTitles.map(title => (
    <FormattedParagraph key={title} locale={title} />
  ));
}

const Tutorial = ({ back }) => (
  <div className="container">
    <div className="row text-center pb-3 border-bottom">
      <div className="col">
        <FormattedHeader2 locale="shared.tutorial" />
      </div>
    </div>
    <div className="pt-3" />
    {renderParagraphs()}
    <div className="row text-center">
      <Image src={exImage1} />
    </div>
    <FormattedParagraph locale="tutorial.fourth" />
    <div className="row text-center">
      <Image src={exImage2} />
    </div>
    <FormattedParagraph locale="tutorial.fifth" />
    <div className="row text-center">
      <DefaultButton text="shared.back" url="/" />
    </div>
  </div>
);

export default Tutorial;
