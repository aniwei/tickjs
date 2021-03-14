export function ViewScript (props) {
  const { 
    __TICK_CONTEXT,
    viewId, 
    route,
    path
  } = props;

  const { 
    device, 
    config, 
    system, 
    appconfig,
  } = __TICK_CONTEXT;

  const html = `
    import '/AppViewRuntime.js';

    const __TIME_RUNTIME_APPCONFIG = ${JSON.stringify(appconfig)};
    const __TIME_RUNTIME_SYSTEM = ${JSON.stringify(system)};
    const __TIME_RUNTIME_DEVICE = ${JSON.stringify(device)};
    const __TIME_RUNTIME_PATH = '${path}';
    const __TIME_RUNTIME_ROUTE = '${route}';
    const __TIME_RUNTIME_VIEWID = '${viewId}';
  `;

  return <script type="module" dangerouslySetInnerHTML={{__html: html }}></script>
}