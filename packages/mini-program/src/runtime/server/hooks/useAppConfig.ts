import { useMemo } from 'react';

export function useAppConfig (props) {
  const { __TICK_RUNTIME } = props;

  return useMemo(() => {
    return __TICK_RUNTIME.appconfig
  }, [__TICK_RUNTIME])
}