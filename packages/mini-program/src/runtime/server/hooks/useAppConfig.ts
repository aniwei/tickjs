import { useMemo } from 'react';
import { getApplicationConfig } from './shared';

export function useAppConfig (props) {
  const { __TICK_MINI_PROGRAM } = props;

  return useMemo(() => {
    return __TICK_MINI_PROGRAM.appconfig
  }, [__TICK_MINI_PROGRAM])
}