import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TickApp from './componnets/TickApp';

function App() {
  const [__TICK_CONTEXT, setTickContext] = useState(null);

  useEffect(() => {
    axios
      .get('/__TICK/CONTEXT')
      .then(res => {
        setTickContext(res.data);
      }).catch(error => {

      })
  }, []);

  return __TICK_CONTEXT ? <TickApp 
    __TICK_CONTEXT={__TICK_CONTEXT} 
  /> : null;
}

export default App
