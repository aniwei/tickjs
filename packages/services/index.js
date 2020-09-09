const Server = require('rpc-websockets').Server;

const env = process.env;

const defaultOptions = {
  port: 10086,
  host: `localhost`
}

module.exports = function (options) {
  const server = new Server({
    ...defaultOptions,
    port: env.RPC_PORT,
    host: env.RPC_HOST,
    ...options
  });

  server.register();
  server.register();
  server.register('getSystemInfo');
}