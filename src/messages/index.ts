import da from './da';
import de from './de';
import en from './en';
import es from './es';
import fr from './fr';
import hi from './hi';
import id from './id';
import it from './it';
import ja from './ja';
import ko from './ko';
import mr from './mr';
import pt from './pt';
import ar from './ar';
import ru from './ru';
import sr from './sr';
import sv from './sv';
import uk from './uk';
import zh from './zh';
import zhCN from './zhCN';
import cs from './cs';
import ca from './ca';
import tr from './tr';

type Message = {
  'homePage.title': string;
  'game.score': string;
  'game.x-score': string;
  'game.o-score': string;
  'game.easy': string;
  'game.medium': string;
  'game.hard': string;
  'game.placeholder': string;
  'game.reset': string;
  'tutorial.first': string;
  'tutorial.second': string;
  'tutorial.third': string;
  'tutorial.fourth': string;
  'tutorial.fifth': string;
  'shared.sp': string;
  'shared.mp': string;
  'shared.tutorial': string;
  'shared.back': string;
};

type Messages = {
  [locale: string]: Message;
};

const MESSAGES: Messages = {
  en,
  es,
  fr,
  pt,
  de,
  it,
  hi,
  mr,
  ko,
  ja,
  da,
  sr,
  id,
  uk,
  ru,
  sv,
  zh,
  zhCN,
  ar,
  ca,
  cs,
  tr,
};

export default Object.entries(MESSAGES).reduce(
  (accum, [key, val]) => ({ ...accum, [key]: { translation: val } }),
  {},
);
