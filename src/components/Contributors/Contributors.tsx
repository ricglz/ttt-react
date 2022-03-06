import React from 'react';
import type { ContributorType } from './Contributor';
import Contributor from './Contributor';

type ContributorsType = ContributorType[];

async function fetchContributors() {
  const response = await fetch(
    'https://api.github.com/repos/ricglz/ttt-react/contributors',
  );
  const data = await response.json();
  return data;
}

function useContributors() {
  const [contributors, setContributors] = React.useState<ContributorsType>([]);
  React.useEffect(() => {
    const setData = async () => {
      const newContributors = await fetchContributors();
      setContributors(newContributors);
    };
    setData();
  }, []);
  return contributors;
}

export default function Contributors() {
  const contributors = useContributors();
  return (
    <div>
      <ul className="contributors">
        {contributors.map((contributor) => (
          <Contributor key={contributor.login} {...contributor} />
        ))}
      </ul>
    </div>
  );
}
