import React, { useEffect } from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';

import ReadabilityPanel from '../components/ReadabilityPanel';
import DefaultEditor from '../components/DefaultEditor';

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();

  useEffect(() => {
    sdk.window.startAutoResizer()
  })

  return (
    <div>
      <DefaultEditor sdk={sdk} isInitiallyDisabled={false} />
      <ReadabilityPanel sdk={sdk} />
    </div>
  )
};

export default Field;
