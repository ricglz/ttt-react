import { request } from '@octokit/request';
import React from 'react';
import Contributor from './Contributor';

async function fetchContributors() {
  const response = await request('GET /repos/{owner}/{repo}/contributors', {
    owner: 'ricglz',
    repo: 'ttt-react',
  });
  return response.data;
}

type ContributorsType = Awaited<ReturnType<typeof fetchContributors>>;

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
