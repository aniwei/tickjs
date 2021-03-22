import { useEffect } from 'react';

function scriptLoader (src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.type = 'application/javascript';
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

export function useScript (scripts: string[], callback: Function, autoLoad: boolean = true) {  
  useEffect(() => {
    if (autoLoad) {
      const run = async () => {
        let script = scripts.shift(); 
  
        for ( ;script; ) {
          await scriptLoader(script);
          script = scripts.shift(); 
        }
  
        callback();
      }
  
      run();
    }
  }, [autoLoad]);
}