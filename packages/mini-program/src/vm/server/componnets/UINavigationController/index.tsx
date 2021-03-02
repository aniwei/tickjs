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

export default class UINavigationController extends Component {
  public iframe: HTMLIFrameElement | null = null;

  onLoad = () => {

  }

  render () {
    return (
      <div>
        <UINavigationScript onLoad={this.onLoad} />
        <UINavigationHeader />

        <iframe src="/pages" ref={ref => this.iframe = ref}>
          <style jsx>{`
            iframe {
              margin: 0;
              border: none;
            }
          `}</style>
        </iframe>
      </div>
    )
  }

}