import React from 'react';
import exImage1 from '../../images/example1.gif';
import exImage2 from '../../images/example2.png';
import BackButton from '../Layout/BackButton';
import { FormattedParagraph, FormattedHeader2 } from '../Layout/FormattedText';

type ImageProps = {
  src: string
};

const Image = ({ src }: ImageProps) => (
  <div className="col">
    <img src={src} className="img-fluid" alt="example" />
  </div>
);

const PARAGRAPHS_TITLES = [
  'tutorial.first',
  'tutorial.second',
  'tutorial.third',
];

const Tutorial = () => (
  <div className="container">
    <div className="row text-center pb-3 border-bottom">
      <div className="col">
        <FormattedHeader2 locale="shared.tutorial" />
      </div>
    </div>
    <div className="pt-3" />
    {
      PARAGRAPHS_TITLES.map((title) => (
        <FormattedParagraph key={title} locale={title} />
      ))
    }
    <div className="row text-center">
      <Image src={exImage1} />
    </div>
    <FormattedParagraph locale="tutorial.fourth" />
    <div className="row text-center">
      <Image src={exImage2} />
    </div>
    <FormattedParagraph locale="tutorial.fifth" />
    <div className="row text-center">
      <BackButton text="shared.back" url="/" />
    </div>
  </div>
);

export default Tutorial;
