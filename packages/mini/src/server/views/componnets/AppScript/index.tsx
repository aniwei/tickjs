export function AppScript (props) {

  const { __TICK_CONTEXT } = props;
  const { device, config, system, types, appconfig } = __TICK_CONTEXT;

  const html = `
    import '/AppViewRuntime.js';

    const __TIME_RUNTIME_APPCONFIG = ${JSON.stringify(appconfig)};
    const __TIME_RUNTIME_CONFIG = ${JSON.stringify(config)};
    const __TIME_RUNTIME_SYSTEM = ${JSON.stringify(system)};
    const __TIME_RUNTIME_DEVICE = ${JSON.stringify(device)};
    const __TIME_RUNTIME_TYPES = ${JSON.stringify(types)};
  `;

  return <script dangerouslySetInnerHTML={{__html: html }}></script>
}