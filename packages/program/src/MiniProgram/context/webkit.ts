export const webkit = {
  messageHandlers: {
    invokeHandler: {
      postMessage (data) {
        console.log('postMessage', data);
        // (<any>process)?.send(data);
      },
    },
  },
}