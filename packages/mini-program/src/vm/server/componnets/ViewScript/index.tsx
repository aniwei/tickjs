import { useScript } from '../../hooks/useScript';

export function ViewScript (props) {
  useScript([`/WAWebview.js`, `/appwxss`], () => {
    __TICK_MINI_PROGRAM.ready();
  });

  const {
    webviewId, 
    route 
  } = props;
  const { 
    device, 
    config, 
    system, 
  } = props.__TICK_MINI_PROGRAM;

  const html = `
    const __TICK_MINI_PROGRAM = {
      route: '${route}',
      webviewId: ${webviewId},
      eval: window.eval,
      console: window.console,
      nextTick: window.setTimeout,
      deive: ${JSON.stringify(device)},
      config: ${JSON.stringify(config)},
      system: ${JSON.stringify(system)},
      document: window.parent.document,
      define: function (name, value) {
        try {
          Object.defineProperty(window, name, {
            get: function () { return value }
          });
        } catch (error) {}
      },
      ready: function () {
        const setCSS = __wxAppCode__['pages/code/code.wxss'];

        const __setCssStartTime__ = Date.now();			
        setCSS();
	      const __setCssEndTime__ = Date.now(); 

        this.generator = $gwx('./${route}.wxml');

        if (window.__wxAppCodeReadyCallback__) {
          window.__wxAppCodeReadyCallback__(this.generator);
        } else {
          document.dispatchEvent(new CustomEvent('generateFuncReady', {
            detail: {
              generateFunc: this.generator
            }
          }));
        }
      },
      inject: function (source) {
        this.define('WeixinJSCore', {
          dispatch: function (name, detail) {
            const event = new CustomEvent(\`\${source}.\${name}\`, { 
              detail: { 
                ...detail, 
                source,
                name
              } 
            });
          
            __TICK_MINI_PROGRAM.document.dispatchEvent(event);
          },
          invokeHandler: function (name, data, callbackId) {
            __TICK_MINI_PROGRAM.console.info(
              \`【消息来源 - \${source}】\`, 
              \`「invokeHandler」:\${name}\`,
              \`数据:\`, data,
              \`回调函数:\`, callbackId
            );

            this.dispatch(name, { data, callbackId });
          },

          publishHandler: function (name, data) {
            __TICK_MINI_PROGRAM.console.info(
              \`【消息来源 - \${source}】\`, 
              \`「publishHandler」:\${name}\`,
              \`数据:\`, data,
              \`WebViewId:\`, ${webviewId}
            );

            const nativeTime = Date.now();

            if (name === 'custom_event_webviewCreated') {
              this.dispatch('created', {});
            }

            this.dispatch(name, {
              args: [name, JSON.parse(data), ${webviewId}, { nativeTime }]
            })
          }
        });
      }
    };

    __TICK_MINI_PROGRAM.inject('webview');
    __TICK_MINI_PROGRAM.define('__webviewId', __TICK_MINI_PROGRAM.webviewId);
    __TICK_MINI_PROGRAM.define('__wxConfig', __TICK_MINI_PROGRAM.config);
    __TICK_MINI_PROGRAM.define('__deviceInfo', __TICK_MINI_PROGRAM.device);
  `;

  return <script dangerouslySetInnerHTML={{__html: html }}></script>
}