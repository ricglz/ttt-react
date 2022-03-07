import type { Locale } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FormattedMessage } from '../Layout/FormattedText';

type RenderTextProps =
  | { staticText?: false; text: Locale }
  | { staticText?: true; text: string };

function renderText({ staticText, text }: RenderTextProps) {
  return staticText ? (
    <span>{text}</span>
  ) : (
    <FormattedMessage locale={text as Locale} />
  );
}

type Props = { url: string } & RenderTextProps;

const HomeButton = ({ url, ...rest }: Props) => (
  <div className="row justify-content-center border-top py-3">
    <Link className="btn btn-home" to={url}>
      {renderText(rest)}
    </Link>
  </div>
);

export default HomeButton;
