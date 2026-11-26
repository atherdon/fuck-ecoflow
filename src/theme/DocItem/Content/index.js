import React from 'react';
import Content from '@theme-original/DocItem/Content';
import LanguageNotice from '@site/src/components/LanguageNotice';

export default function ContentWrapper(props) {
  return (
    <>
      <LanguageNotice />
      <Content {...props} />
    </>
  );
}
