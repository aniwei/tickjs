import { useState, useEffect, Component } from 'react';
import { useScript } from '../../hooks/useScript';
import { UINavigationController } from '../UINavigationController';



export function UIMobile (props) { 
  const [controllers, setControllers] = useState([]);

  useEffect(() => {
    const { onLoad } = props;
    const controller = { route: 'pages/index/index', id: Date.now() };

    setControllers([
      controller
    ]);

    onLoad({
      controller,
      navigate () {}
    });
  }, [])

  return (
    <div className="mobile">
      <style jsx>{`
        .mobile {
          border-radius: 20px;
          box-shadow: -20px 0 50px rgba(200, 200, 200, 1);
          overflow: hidden;
          width: 375px;
          height: 795px;
          display: flex;
          flex-direction: column;
        }

        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 64px;
          background-color: rgba(250, 250, 250, 1);
        }

        .header .circle {
          background-color: rgba(230, 230, 230, 1);
          height: 10px;
          width: 10px;
          border-radius: 10px;
        }

        .header .line {
          background-color: rgba(230, 230, 230, 1);
          height: 10px;
          width: 64px;
          border-radius: 10px;
          margin-left: 10px
        }

        .content {
          flex: 1;
        }

        .footer {
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(250, 250, 250, 1);
        }

        .footer .circle {
          width: 40px;
          height: 40px;
          border-radius: 40px;
          background-color: rgba(230, 230, 230, 1);
        }
      `}</style>

      <div className="header">
        <div className="circle"></div>
        <div className="line"></div>
      </div>
      <div className="content">
        <UINavigationController 
          route="pages/index/index"
        />
      </div>
      <div className="footer">
        <div className="circle"></div>
      </div>
    </div>
  )
  
}