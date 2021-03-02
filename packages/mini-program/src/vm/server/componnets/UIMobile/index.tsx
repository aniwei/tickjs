import { useEffect, Component } from 'react';
import { useScript } from '../../hooks/useScript';


export function UIMobile (props) {
  useScript(`/config`);
  useScript(`/WAService.js`);
  useScript(`/service`);
  useScript(() => {
    const { onLoad } = props;
    onLoad();
  })
  
  return (
    <div className="mobile">
      <style jsx>{`
        .mobile {
          
        }

        .header {

        }
      `}</style>

      <div className="header">

      </div>
    </div>
  )
  
}