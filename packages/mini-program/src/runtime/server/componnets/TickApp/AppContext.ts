import { createContext } from 'react';

export const AppContext = createContext({
  appnavigator: null,
  appservice: null,
  appconfig: null,
  __TICK_MINI_PROGRAM: null,
});

export const { 
  Provider, 
  Consumer 
} = AppContext;
