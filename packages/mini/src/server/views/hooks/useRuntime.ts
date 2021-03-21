import { useMemo, useEffect } from 'react';

import { getApplicationClientRuntime } from '@tickjs/client';

export function useRuntime (onServiceReady: Function) {
  const runtime = useMemo(() => {
    const runtime = getApplicationClientRuntime(`@tickjs/service`);
    return runtime;
  }, []);

  useEffect(() => {
    runtime.run(onServiceReady);
  }, [runtime]);

  return runtime;
}