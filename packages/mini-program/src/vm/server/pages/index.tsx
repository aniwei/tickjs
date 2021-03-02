import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { UIMobile } from '../componnets/UIMobile';
import { UIService } from '../componnets/UIService';
import { Provider } from '../context';


export default function Index () {
  
  return (
    <Provider value={{}}>
      <UIService 
        onLoad={() => {}}
        onMessage={() => {}}
      />
      
    </Provider>
  );
}