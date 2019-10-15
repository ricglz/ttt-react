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

async function fetchContributors(setContributors) {
  const octokat = new Octokat();
  let response = null;
  try {
    response = await octokat.repos('ricglz0201', 'ttt-react')
      .contributors.fetch();
  } catch (error) {
    return;
  }
  const { items } = response;
  setContributors(items.map(mapContributors));
}

function useContributors() {
  const [contributors, setContributors] = React.useState(null);
  React.useEffect(() => {
    fetchContributors(setContributors);
  }, []);
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
