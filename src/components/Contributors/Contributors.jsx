import Contributor from './Contributor';
import Octokat from 'octokat';
import React from 'react'

export default function Contributors() {
  const [contributors, setContributors] = React.useState(null);
  React.useEffect(() => {
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
        setContributors(contributors);
      });
  }, [setContributors]);
  return (
    <div>
      <ul className="contributors">
        {contributors}
      </ul>
    </div>
  )
}
