export function TickAppScript (props) {
  const { __TICK_MINI_PROGRAM } = props;
  const { deive, config, system, types } = __TICK_MINI_PROGRAM;

  const html = `
    const __TICK_MINI_PROGRAM = {
      eval: window.eval,
      console: window.console,
      nextTick: window.setTimeout,
      deive: ${JSON.stringify(deive)},
      config: ${JSON.stringify(config)},
      system: ${JSON.stringify(system)},
      types: ${JSON.stringify(types)},
      document: window.parent === window ? 
        window.document : window.parent.document,
      define: function (name, value) {
        try {
          Object.defineProperty(window, name, {
            get: function () { return value }
          });
        } catch (error) {}
      },
      inject: function (source) {
        this.define('WeixinJSCore', {
          dispatch: function () {
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

          publishHandler: function (name, data, webviewId) {
            __TICK_MINI_PROGRAM.console.info(
              \`【消息来源 - \${source}】\`, 
              \`「publishHandler」:\${name}\`,
              \`数据:\`, data,
              \`WebViewId:\`, webviewId
            );

            const nativeTime = Date.now();
            const webviewIds = JSON.parse(webviewId);

            for (const webviewId of webviewIds) {
              this.dispatch(name, {
                webviewId,
                args: [ name, JSON.parse(data), 0, { nativeTime }]
              });
            }
          }
        });
      }
    };

    __TICK_MINI_PROGRAM.inject('service');
  `;

  return <script dangerouslySetInnerHTML={{__html: html }}></script>
}