import { createContext } from 'react';

export const AppContext = createContext({
  appnavigator: null,
  appservice: null,
  appconfig: null,
  __TICK_RUNTIME: null,
});

export const { 
  Provider, 
  Consumer 
} = AppContext;
