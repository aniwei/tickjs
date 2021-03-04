import React from 'react';
import dynamic from 'next/dynamic';
import { AppScript } from '../AppScript';

const App = dynamic(import('./App'), { ssr: false })

export function TickApp (props) {
  return <div className="mini-program">
    <AppScript {...props} />
    <App {...props} />
  </div>
}
