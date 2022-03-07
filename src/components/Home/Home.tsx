import { FormattedHeader } from '../Layout/FormattedText';
import HomeButton from './HomeButton';

export default function Home() {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <FormattedHeader locale="homePage.title" />
        </div>
      </div>
      <HomeButton text="shared.sp" url="/singleplayer" />
      <HomeButton text="shared.mp" url="/multiplayer" />
      <HomeButton staticText text="Online" url="/online" />
      <HomeButton text="shared.tutorial" url="/tutorial" />
      <HomeButton staticText text="Contributors" url="/contributors" />
    </div>
  );
}
