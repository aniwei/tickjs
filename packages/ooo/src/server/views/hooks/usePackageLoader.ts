import { useMemo } from 'react';


export function usePackageLoader (appruntime, appconfig) {
  return useMemo(() => {
    return (route): Promise<void> =>  {
      
      return new Promise((resolve, reject) => {
        if (route in appconfig.subPages) {
          const options = { route };          
          appruntime.invokeHandler('importsubappservice', options, () => resolve());
        } else {
          resolve();
        }
      })
    }
  }, [appruntime])
}