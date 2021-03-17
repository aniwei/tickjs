import { createContext } from 'react';
import { TickAppContext } from '../../../../types';

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
