import React from 'react';
import { useContextLoader } from '../../hooks/useContextLoader'
import App from './App';


export default function AppContext () {
  const { isContextLoaded, context } = useContextLoader();

  return <div className="mini">
    {isContextLoaded && <App config={context}  />}
  </div>
}
