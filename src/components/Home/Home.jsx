import React from 'react';
import { FormattedMessage } from 'react-intl';
import HomeButton from './HomeButton';

const Home = props => (
  <div className="container text-center">
    <div className="row">
      <div className="col">
        <FormattedMessage id="homePage.title" default="Home Page">
          {txt => <h1>{txt}</h1>}
        </FormattedMessage>
      </div>
    </div>
    <HomeButton func={props.changeToAi} text="shared.sp" />
    <HomeButton func={props.changeToPvp} text="shared.mp" />
    <HomeButton func={props.changeToTutorial} text="shared.tutorial" />
  </div>
);

export default Home;
