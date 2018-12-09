import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import HomeButton from './HomeButton';

const Home = ({ changeToAi, changeToPvp, changeToTutorial }) => (
  <div className="container text-center">
    <div className="row">
      <div className="col">
        <FormattedMessage id="homePage.title" default="Home Page">
          {txt => <h1>{txt}</h1>}
        </FormattedMessage>
      </div>
    </div>
    <HomeButton func={changeToAi} text="shared.sp" />
    <HomeButton func={changeToPvp} text="shared.mp" />
    <HomeButton func={changeToTutorial} text="shared.tutorial" />
  </div>
);

Home.propTypes = {
  changeToTutorial: PropTypes.func.isRequired,
  changeToPvp: PropTypes.func.isRequired,
  changeToAi: PropTypes.func.isRequired,
};

export default Home;
