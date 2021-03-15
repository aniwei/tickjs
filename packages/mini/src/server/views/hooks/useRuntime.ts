import { useMemo, useEffect } from 'react';

import AppRuntime from '/@tickjs/AppRuntime';

export function useRuntime (onServiceReady: Function) {
  const appruntime = useMemo(() => {
    const appruntime = AppRuntime.shareAppRuntime(`/@tickjs/ServiceRuntime.ts`);
    return appruntime;
  }, []);

  useEffect(() => {
    appruntime.run(onServiceReady);
  }, [appruntime]);

  return appruntime;
}