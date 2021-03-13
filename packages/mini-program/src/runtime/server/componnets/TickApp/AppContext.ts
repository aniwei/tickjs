import { createContext } from 'react';

export const AppContext = createContext({
  navigator: null,
  runtime: null,
  __TICK_RUNTIME: null,
});

export const { 
  Provider, 
  Consumer 
} = AppContext;
