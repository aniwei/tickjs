import { Component } from 'react';
import { useScript } from '../../hooks/useScript';

function UINavigationHeader () {
  return (
    <div></div>
  )
}

export function UINavigationScript (props) {
  useScript(`/WebViewWeixinJSCore.js`);
  useScript(`/uiwebview`);

  useScript(() => {
    const { onLoad } = props;

    onLoad();
  });

  return null;
}

export interface IProps {
  route: string
}

export class UINavigationController extends Component <IProps> {
  public iframe: HTMLIFrameElement | null = null;

  onLoad = () => {

  }

  render () {
    const { route } = this.props;

    return (
      <div className="navigation">
        <UINavigationHeader />

        <iframe 
          className="iframe" 
          src={`view?r=${route}`} 
          ref={ref => this.iframe = ref} 
        />

        <style jsx>{`
          .navigation {
            height: 100%;
            width: 100%;
          }

          .iframe {
            margin: 0;
            border: none;
            height: 100%;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }

}