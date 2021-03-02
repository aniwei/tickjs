import { Component } from 'react';
import fetch from 'isomorphic-fetch';

import { MiniProgram } from '../componnets/MiniProgram';
import { Provider } from '../context';


export default function Index () {
  
  return (
    <Provider value={{}}>
      <MiniProgram />
      
    </Provider>
  );
}