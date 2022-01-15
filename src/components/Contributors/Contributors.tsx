import Octokat from 'octokat';
import type { RepoContributors } from 'octokat';
import React from 'react';
import Contributor from './Contributor';

async function fetchContributors() {
  const octokat = new Octokat();
  let response = null;
  try {
    response = await octokat.repos('ricglz0201', 'ttt-react')
      .contributors.fetch();
  } catch (error) {
    return [];
  }
  return response.items;
}

function useContributors() {
  const [contributors, setContributors] = React.useState<RepoContributors[]>([]);
  React.useEffect(() => {
    const setData = async () => {
      const newContributors = await fetchContributors();
      setContributors(newContributors);
    };
    setData();
  }, []);
  return [contributors];
}

export default function Contributors() {
  const [contributors] = useContributors();
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
