import React from 'react';
// import PropTypes from 'prop-types';
import Octokat from 'octokat';
import { FormattedMessage } from 'react-intl';
import HomeButton from './HomeButton';
import Contributor from './Contributor';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contributors: null };
  }

  componentDidMount() {
    /*const octo = new Octokat();
    octo.repos('ricglz0201', 'ttt-react').contributors.fetch()
      .then(({ items }) => {
        const contributors = items.map(({ avatarUrl, htmlUrl, login }) => (
          <Contributor
            key={login}
            avatarUrl={avatarUrl}
            htmlUrl={htmlUrl}
            login={login}
          />
        ));
        this.setState({ contributors });
      });
    */
  }

  render() {
    const {
      changeToAi, changeToPvp, changeToOnline, changeToTutorial,
    } = this.props;
    const { contributors } = this.state;
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
        <HomeButton staticText text="Online" url="/login" />
        <HomeButton text="shared.tutorial" url="/tutorial" />
        <ul className="contributors">
          {contributors}
        </ul>
      </div>
    );
  }
}

export default Home;
