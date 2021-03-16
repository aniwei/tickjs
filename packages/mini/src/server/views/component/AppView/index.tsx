import React from 'react';
import { useContextLoader } from '../../hooks/useContextLoader';

import AppView from './View'

export default function AppContext (props) {
  const { isContextLoaded, context } = useContextLoader();


  return <div className="mini-view">
    {isContextLoaded && <AppView {...props} context={context}  />}
  </div>
}