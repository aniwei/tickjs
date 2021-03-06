export function AppScript (props) {
  const { __TICK_MINI_PROGRAM } = props;
  const { deive, config, system, types } = __TICK_MINI_PROGRAM;

  const html = `
    const __TICK_MINI_PROGRAM = {
      eval: window.eval,
      console: window.console,
      nextTick: function (callback) { window.setTimeout(callback, 0) },
      storage: window.localStorage,
      deive: ${JSON.stringify(deive)},
      config: ${JSON.stringify(config)},
      system: ${JSON.stringify(system)},
      types: ${JSON.stringify(types)},
      document: window.document,
      define: function (name, value) {
        try {
          Object.defineProperty(window, name, {
            get: function () { return value }
          });
        } catch (error) {}
      },
      send: function (name, body) {
        return fetch(\`/api/\${name}\`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body
        });
      },
      remote: {
        createRequestTask: function (data) {
          return __TICK_MINI_PROGRAM.send('createRequestTask', data);
        },
        login: function () {
          return __TICK_MINI_PROGRAM.send('login', null);
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
            // if (name !== 'reportKeyValue') {
            //   __TICK_MINI_PROGRAM.console.info(
            //     \`【消息来源 - \${source}】\`, 
            //     \`「invokeHandler」:\${name}\`,
            //     \`数据:\`, data,
            //     \`回调函数:\`, callbackId
            //   );
            // }

            this.dispatch(name, { data: JSON.parse(data), callbackId });
          },

          publishHandler: function (name, data, webviewId) {
            // __TICK_MINI_PROGRAM.console.info(
            //   \`【消息来源 - \${source}】\`, 
            //   \`「publishHandler」:\${name}\`,
            //   \`数据:\`, data,
            //   \`WebViewId:\`, webviewId
            // );

            const nativeTime = Date.now();
            const webviewIds = JSON.parse(webviewId);

            if (name === 'custom_event_onAppRoute') {
              const json = JSON.parse(data);

              this.dispatch(name, {
                webviewId: json.data.webviewId,
                args: [ name, json, 0, { nativeTime }]
              });
            } else {
              for (const webviewId of webviewIds) {
                this.dispatch(name, {
                  webviewId,
                  args: [ name, JSON.parse(data), 0, { nativeTime }]
                });
              }
            }
          }
        });
      }
    };

    __TICK_MINI_PROGRAM.inject('service');
    __TICK_MINI_PROGRAM.define('__wxConfig', __TICK_MINI_PROGRAM.config);
  `;

  return <script dangerouslySetInnerHTML={{__html: html }}></script>
}