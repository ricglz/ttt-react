import i18next from 'i18next';
import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter as Router } from 'react-router-dom';

type Locale = string;

function getDirection(locale: Locale) {
  return locale === 'ar' ? ['rtl', 'text-right'] : ['ltr', 'text-left'];
}

type Props = {
  ChildrenComponent: React.FC;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RouterComponent?: any;
};

export default function ContextsProvider({
  children,
  ChildrenComponent,
  RouterComponent = Router,
}: Props) {
  const [direction, klass] = getDirection(i18next.language);

  return (
    <div dir={direction} className={klass}>
      <RouterComponent>
        <ChildrenComponent />
        {children}
      </RouterComponent>
      <NotificationContainer />
    </div>
  );
}
