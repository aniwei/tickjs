import Document, { Html, Head, Main, NextScript } from 'next/document';


function DocumentCommonScripts () {
  const script = `
    const $$nextTick = window.setTimeout;
    const $$document = window.parent === window ? 
      window.document : window.parent.document;

    const $$console = window.console;
    const $$defineProperty = Object.defineProperty;
    const $$define = function (name, value) {
      try {
        $$defineProperty(window, name, {
          get: function () { return value }
        });
      } catch (error) {}
    }
  `;

  return <script type="application/javascript">{script}</script>
}

function DocumentUIServiceScripts () {
  return (
    <>
      <script src="/ServiceWeixinJSCore.js" type="application/javascript"></script>
      <script src="/uiservice" type="application/javascript"></script>
    </>
  )
}

function DocumentUIViewScripts () {
  return (
    <>
      <script src="/ServiceWeixinJSCore.js" type="application/javascript"></script>
      <script src="/uiservice" type="application/javascript"></script>
    </>
  )
}

function DocumentScripts (props) {
  const { __NEXT_DATA__ } = props;
  const { page } = __NEXT_DATA__;

  return <>
    <DocumentCommonScripts />
    { 
      page === '/' ? 
        <DocumentUIServiceScripts /> :
        <DocumentUIViewScripts />
    }
  </>
}



export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
  
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <DocumentScripts {...this.props} />
      </Html>
    )
  }
}