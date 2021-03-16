import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import App from './App';


export default function TickApp () {
  const [
    { isAppLaunched, context }, 
    setContext
  ] = useState({ isAppLaunched: false, context: null });

  useEffect(() => {
    axios.get('/@tickjs/context')
      .then(ctx => {
        setContext({
          isAppLaunched: true,
          context: ctx.data
        });
      })
  }, []);

  return <div className="mini-program">
    {isAppLaunched && <App context={context}  />}
  </div>
}
