import React from 'react';
import dynamic from 'next/dynamic';
import { TickAppScript } from '../TickAppScript';

const App = dynamic(import('./App'), { ssr: false })

export function TickApp (props) {
  return <div className="mini-program">
    <TickAppScript {...props} />
    <App {...props} />
  </div>
}
