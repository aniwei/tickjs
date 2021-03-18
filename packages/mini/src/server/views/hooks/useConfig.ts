import { useMemo } from 'react';
import { getApplicationConfig } from './shared'

export function useConfig (config: TickAppConfig) {
  return useMemo(() => {
    return getApplicationConfig(config)
  }, [])
}