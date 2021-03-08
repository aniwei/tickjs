export function ViewScript (props) {
  const { 
    __TICK_MINI_PROGRAM,
    webviewId, 
    route 
  } = props;

  const { 
    device, 
    config, 
    system, 
  } = __TICK_MINI_PROGRAM;

  const html = `
    const __TICK_MINI_PROGRAM = {
      mode: 'RELEASE',
      route: '${route}',
      webviewId: ${webviewId},
      eval: window.eval,
      console: window.console,
      nextTick: window.setTimeout,
      device: ${JSON.stringify(device)},
      config: ${JSON.stringify(config)},
      system: ${JSON.stringify(system)},
      document: window.parent.document,
      info: function (...args) {
        if (this.mode === 'DEBUG') {
          this.console.info(...args);
        }
      },
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
            __TICK_MINI_PROGRAM.info(
              \`【消息来源 - \${source}】\`, 
              \`「invokeHandler」:\${name}\`,
              \`数据:\`, data,
              \`回调函数:\`, callbackId
            );

            this.dispatch(name, { data, callbackId });
          },

          publishHandler: function (name, data) {
            __TICK_MINI_PROGRAM.info(
              \`【消息来源 - \${source}】\`, 
              \`「publishHandler」:\${name}\`,
              \`数据:\`, data,
              \`WebViewId:\`, ${webviewId}
            );

            const nativeTime = Date.now();

            if (name === 'custom_event_webViewCreated') {
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

    window.__TICK_MINI_PROGRAM = __TICK_MINI_PROGRAM;
  `;

  return <script dangerouslySetInnerHTML={{__html: html }}></script>
}