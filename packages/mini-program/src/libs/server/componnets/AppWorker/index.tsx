export function AppWorker (props) {
  const { __TICK_RUNTIME } = props;
  const { device, config, system, types, appconfig } = __TICK_RUNTIME;

  const html = `
    const script = \`
      const __TICK_RUNTIME = {
        mode: 'RELEASE',
        eval: this.eval,
        console: this.console,
        storage: this.localStorage,
        appconfig: ${JSON.stringify(appconfig)},
        device: ${JSON.stringify(device)},
        config: ${JSON.stringify(config)},
        system: ${JSON.stringify(system)},
        types: ${JSON.stringify(types)},
        window: global,
        nextTick: function (callback) { 
          return new Promise((resolve) => {
            callback();
            resolve();
          })
        },
        info: function (...args) {
          if (this.mode === 'DEBUG') {
            this.console.info(...args);
          }
        },
        define: function (name, value) {
          try {
            Object.defineProperty(this.window, name, {
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
            return __TICK_RUNTIME.send('createRequestTask', data);
          },
          login: function () {
            return __TICK_RUNTIME.send('login', null);
          }
        },

        get WeixinJSBridge () {
          return window.WeixinJSBridge;
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
            
              __TICK_RUNTIME.document.dispatchEvent(event);
            },
            invokeHandler: function (name, data, callbackId) {
              __TICK_RUNTIME.info(
                \`【消息来源 - \${source}】\`, 
                \`「invokeHandler」:\${name}\`,
                \`数据:\`, data,
                \`回调函数:\`, callbackId
              );

              this.dispatch(name, { data: JSON.parse(data), callbackId });
            },

            publishHandler: function (name, data, webviewId) {
              __TICK_RUNTIME.info(
                \`【消息来源 - \${source}】\`, 
                \`「publishHandler」:\${name}\`,
                \`数据:\`, data,
                \`WebViewId:\`, webviewId
              );

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

      __TICK_RUNTIME.inject('service');
      __TICK_RUNTIME.define('__wxConfig', __TICK_RUNTIME.config);
    \`;
  
    cosnt worker = new Worker(URL.createObjectURL( new Blob([script], 'application/javascript' )));
  `;

  return <script dangerouslySetInnerHTML={{__html: html }}></script>
}