import React from 'react';
import App from './App';

export default function TickApp (props) {
  const __TICK_RUNTIME = typeof window === 'object' ? 
    window.__TICK_RUNTIME : null;

  return <div className="mini-program">
    <App 
      {...props} 
      __TICK_RUNTIME={__TICK_RUNTIME} 
    />
  </div>
}
