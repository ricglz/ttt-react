import React from 'react';
import { FormattedMessage } from 'react-intl';
import HomeButton from './HomeButton';

function Home() {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <FormattedMessage id="homePage.title" default="Home Page">
            {txt => <h1>{txt}</h1>}
          </FormattedMessage>
        </div>
      </div>
      <HomeButton text="shared.sp" url="/singleplayer" />
      <HomeButton text="shared.mp" url="/multiplayer" />
      <HomeButton staticText text="Online" url="/online" />
      <HomeButton text="shared.tutorial" url="/tutorial" />
      <HomeButton staticText text="Contributors" url="/contributors" />
    </div>
  );
}

export default Home;
