import { useEffect, useMemo } from 'react';

async function scriptLoader (src): Promise<any> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    
    script.type = 'application/javascript';
    script.src = src;

    script.onload = () => {
      resolve(src);
    }
    script.onerror = (error) => reject(error);
    script.src = src;

    document.head.appendChild(script);
  });
}

export function useScript (src: string | Function) {
  const scripts: any[] = useMemo(() => [], []);

  
  useEffect(() => {
    scripts.push(src);

    const run = async () => {
      let script = scripts.shift();
      
      while (script) {
        if (typeof script === 'function') {
          await script();
        } else if (typeof script === 'string') {
          await scriptLoader(script);
        }

        script = scripts.shift();
      }
    }

    run();
  }, []);
}