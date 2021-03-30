import { useEffect } from 'react';

function scriptLoader (src: string, type?: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.type = type ?? 'application/javascript';
    script.src = src;

    script.onload = () => {
      resolve(src);
    }
    script.onerror = (error) => {
      reject(error);
    }

    script.src = src;

    document.head.appendChild(script);
  })
}

export function useScript (
  scripts: any[], 
  callback: Function, 
  autoLoad: boolean = true
) {  
  useEffect(() => {
    if (autoLoad) {
      const run = async () => {
        let script = scripts.shift(); 
  
        for ( ;script; ) {
          if (typeof script === 'string') {
            await scriptLoader(script);
          } else if (typeof script === 'object') {
            await scriptLoader(script.src, script.type);
          }

          script = scripts.shift(); 
        }
  
        callback();
      }
  
      run();
    }
  }, [autoLoad]);
}