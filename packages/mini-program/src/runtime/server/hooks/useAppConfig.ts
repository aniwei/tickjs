import { useMemo } from 'react';
import { getApplicationConfig } from './shared';

export function useAppConfig (props) {
  const { __TICK_MINI_PROGRAM } = props;

  return useMemo(() => {
    return getApplicationConfig(__TICK_MINI_PROGRAM)
  }, [__TICK_MINI_PROGRAM])
}