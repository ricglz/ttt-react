import React from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
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
  const { i18n } = useTranslation();
  const [direction, klass] = getDirection(i18n.language);

  return (
    <div dir={direction} className={klass}>
      <RouterComponent>
        <ChildrenComponent />
        {children}
      </RouterComponent>
      <Toaster position="bottom-right" />
    </div>
  );
}
