import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

export function useAuthorize () {
  const [authorizion, setAuthorization] = useState(null);
  const id = useMemo(() => {
    return Date.now();
  }, []);

  useEffect(() => {
    const fetching = () => {
      axios.get(`/@weixin/signIn/polling/${id}`).then(res => {
        if (res.data) {
          switch (res.data.state) {
            case 'scanned':
            case 'waiting': {
              setTimeout(fetching, 1000);
            }
            case 'success': {
              setAuthorization(res.data);
              break;
            }
          }
          if (res.data.state === 'success') {
            setAuthorization(res.data);
          }        }

      });
    }

    setTimeout(fetching, 2000);
  }, []);

  return [id, authorizion];
}