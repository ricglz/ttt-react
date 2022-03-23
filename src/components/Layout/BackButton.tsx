import type { Locale } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FormattedMessage } from './FormattedText';

type Props = {
  text: Locale;
  url: string;
};

const BackButton = ({ text, url }: Props) => (
  <div className="col">
    <Link className="btn btn-game btn-lg btn-danger" to={url}>
      <FormattedMessage locale={text} />
    </Link>
  </div>
);

export default BackButton;
