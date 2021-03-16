import { createContext } from 'react';

export const AppContext = createContext({
  navigator: null,
  runtime: null,
  config: null,
});

export const { 
  Provider, 
  Consumer 
} = AppContext;
