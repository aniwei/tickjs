import { createContext } from 'react';

export const AppContext = createContext({
  appnavigator: null,
  runtime: null,
  __TICK_RUNTIME: null,
});

export const { 
  Provider, 
  Consumer 
} = AppContext;
