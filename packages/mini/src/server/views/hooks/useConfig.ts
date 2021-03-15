import { useMemo } from 'react';
import { IAppProps } from '../component/TickApp/App';

import { getApplicationConfig } from './shared'


export function useConfig (props: IAppProps) {
  const { __TICK_CONTEXT } = props;

  return useMemo(() => {
    return getApplicationConfig(__TICK_CONTEXT.config)
  }, [__TICK_CONTEXT])
}