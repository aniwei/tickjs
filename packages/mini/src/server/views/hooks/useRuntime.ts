import { useMemo, useEffect } from 'react';

import AppRuntime from '/@tickjs/AppRuntime';

export function useRuntime (onServiceReady: Function) {
  const runtime = useMemo(() => {
    const runtime = AppRuntime.shareAppRuntime(`/@tickjs/ServiceRuntime`);
    return runtime;
  }, []);

  useEffect(() => {
    runtime.run(onServiceReady);
  }, [runtime]);

  return runtime;
}