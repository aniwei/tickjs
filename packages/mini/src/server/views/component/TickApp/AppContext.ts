import { createContext } from 'react';

const defaultContextValue = {
  navigator: null,
  runtime: null,
  config: null,
}

export const AppContext = createContext(defaultContextValue);

export const { 
  Provider, 
  Consumer 
} = AppContext;
