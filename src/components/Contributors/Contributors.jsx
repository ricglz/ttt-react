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

function catchError() {
  // eslint-disable-next-line no-console
  console.error('Contributors error');
}

function useContributors() {
  const [contributors, setContributors] = React.useState(null);
  const updateContributors = React.useCallback(({ items }) => {
    setContributors(items.map(mapContributors));
  }, [setContributors]);
  React.useEffect(() => {
    (new Octokat()).repos('ricglz0201', 'ttt-react').contributors.fetch()
      .then(updateContributors).catch(catchError);
  }, [updateContributors]);
  return [contributors];
}

export default function Contributors() {
  const [contributors] = useContributors();
  return (
    <div>
      <ul className="contributors">
        {contributors}
      </ul>
    </div>
  );
}
