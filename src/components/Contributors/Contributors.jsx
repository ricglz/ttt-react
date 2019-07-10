import Octokat from 'octokat';
import React from 'react';
import PropTypes from 'prop-types';
import Contributor from './Contributor';

function mapContributors({ avatarUrl, htmlUrl, login }) {
  return (
    <Contributor
      key={login}
      avatarUrl={avatarUrl}
      htmlUrl={htmlUrl}
      login={login}
    />
  );
}

mapContributors.propTypes = {
  login: PropTypes.string.isRequired,
  htmlUrl: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

function updateContributors(setContributors) {
  const octo = new Octokat();
  octo.repos('ricglz0201', 'ttt-react').contributors.fetch()
    .then(({ items }) => {
      const newContributors = items.map(mapContributors);
      setContributors(newContributors);
    });
}

export default function Contributors() {
  const [contributors, setContributors] = React.useState(null);
  React.useEffect(() => {
    updateContributors(setContributors);
  }, [setContributors]);
  return (
    <div>
      <ul className="contributors">
        {contributors}
      </ul>
    </div>
  );
}
