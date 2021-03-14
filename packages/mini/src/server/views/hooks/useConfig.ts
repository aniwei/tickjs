import { useMemo } from 'react';

export function useConfig (props) {
  const { __TICK_CONTEXT } = props;

  return useMemo(() => {
    return __TICK_CONTEXT.appconfig
  }, [__TICK_CONTEXT])
}