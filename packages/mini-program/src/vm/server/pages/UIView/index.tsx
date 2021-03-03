import { useScript } from '../../hooks/useScript';

export default function UIPages (props) {
  useScript(`/WebViewWeixinJSCore.js`);
  useScript(`/uiwebview`);

  return null;
}