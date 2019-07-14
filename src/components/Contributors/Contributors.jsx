import Octokat from 'octokat';
import React from 'react';
import { contributorProps } from '../../constants/props';
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

mapContributors.propTypes = contributorProps;

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
