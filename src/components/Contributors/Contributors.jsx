import Octokat from 'octokat';
import React from 'react';
import Contributor from './Contributor';

export default function Contributors() {
  const [contributors, setContributors] = React.useState(null);
  React.useEffect(() => {
    const octo = new Octokat();
    octo.repos('ricglz0201', 'ttt-react').contributors.fetch()
      .then(({ items }) => {
        const newContributors = items.map(({ avatarUrl, htmlUrl, login }) => (
          <Contributor
            key={login}
            avatarUrl={avatarUrl}
            htmlUrl={htmlUrl}
            login={login}
          />
        ));
        setContributors(newContributors);
      });
  }, [setContributors]);
  return (
    <div>
      <ul className="contributors">
        {contributors}
      </ul>
    </div>
  );
}
