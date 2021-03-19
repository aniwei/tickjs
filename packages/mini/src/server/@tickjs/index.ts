import { ServiceRuntime } from './ServiceRuntime';
import { ClientRuntime } from './ClientRuntime'

export function getApplicationServiceRuntime () {
  const service = ServiceRuntime.sharedRuntime();

  service.run(() => {
    service.publish({
      name: 'appserviceready'
    })
  });

  return service;
}

export function getApplicationClientRuntime (uri: string) {
  const client = ClientRuntime.sharedRuntime(uri);

  return client;
}