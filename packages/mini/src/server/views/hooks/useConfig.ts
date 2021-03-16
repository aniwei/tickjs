import { useEffect, useMemo, useState } from 'react';
import { TickAppConfig } from '../../../types';
import { getApplicationConfig } from './shared'

export function useConfig (config: TickAppConfig) {
  return useMemo(() => {
    return getApplicationConfig(config)
  }, [])
}