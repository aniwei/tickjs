import { createContext } from 'react';

const defaultContextValue: TickAppContext = {
  navigator: null,
  runtime: null,
  config: null,
}

export const AppContext = createContext(defaultContextValue);

export const { 
  Provider, 
  Consumer 
} = AppContext;
