import React from 'react';
import PropTypes from 'prop-types';
import Octokat from 'octokat';
import { FormattedMessage } from 'react-intl';
import HomeButton from './HomeButton';
import Contributor from './Contributor';
import '../../css/contributor.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contributors: null };
  }

  componentDidMount() {
    const octo = new Octokat();
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
  }

  render() {
    const {
      changeToAi, changeToPvp, changeToOnline, changeToTutorial
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
        <HomeButton func={changeToAi} text="shared.sp" />
        <HomeButton func={changeToPvp} text="shared.mp" />
        <HomeButton func={changeToOnline} text="shared.mp"/>
        <HomeButton func={changeToTutorial} text="shared.tutorial" />
        <ul className="contributors">
          {contributors}
        </ul>
      </div>
    );
  }
}

Home.propTypes = {
  changeToTutorial: PropTypes.func.isRequired,
  changeToPvp: PropTypes.func.isRequired,
  changeToAi: PropTypes.func.isRequired,
};

export default Home;
