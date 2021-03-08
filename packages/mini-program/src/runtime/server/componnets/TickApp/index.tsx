import React from 'react';
import App from './App';

export default function TickApp (props) {
  const __TICK_MINI_PROGRAM = typeof window === 'object' ? 
    window.__TICK_MINI_PROGRAM : null;

  return <div className="mini-program">
    <App 
      {...props} 
      __TICK_MINI_PROGRAM={__TICK_MINI_PROGRAM} 
    />
  </div>
}
