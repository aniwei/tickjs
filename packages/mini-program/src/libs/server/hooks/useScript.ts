import { useEffect } from 'react';

function scriptLoader (src) {
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

export function useScript (scripts: string[], callback: Function) {  
  useEffect(() => {
    const run = async () => {
      let script = scripts.shift(); 

      for ( ;script; ) {
        await scriptLoader(script);
        script = scripts.shift(); 
      }

      callback();
    }

    run();
  }, []);
}