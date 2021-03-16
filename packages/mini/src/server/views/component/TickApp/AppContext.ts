import { createContext } from 'react';


export interface IAppContext {
  navigator: any,
  runtime: any,
  config: any,
  __TICK_CONTEXT: any
}

export const AppContext = createContext({
  navigator: null,
  runtime: null,
  config: null,
  __TICK_CONTEXT: null,
});

export const { 
  Provider, 
  Consumer 
} = AppContext;
