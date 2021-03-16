import axios from 'axios';
import {  useEffect, useState } from 'react';



export function useContextLoader () {
  const [context, setContext] = useState({ isContextLoaded: false, context: null })

  useEffect(() => {
    axios
      .get('/@tickjs/context')
      .then(res => setContext(res.data))
  }, []);

  return context;
}