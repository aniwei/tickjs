import { useScript } from '../../hooks/useScript';

export function UIPage (props) {
  useScript(`/WebViewWeixinJSBridge.js`);
  useScript(`/uiwebview`);

  useScript(() => {
    const { onLoad } = props;

    onLoad();
  });

  return null;
}