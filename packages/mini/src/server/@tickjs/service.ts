import { ServiceRuntime } from './ServiceRuntime';
import { ClientRuntime } from './ClientRuntime'

function getApplicationServiceRuntime () {
  const service = ServiceRuntime.sharedRuntime();

  service.run(() => {
    service.publish({
      name: 'appserviceready'
    })
  });

  return service;
}

const service = getApplicationServiceRuntime();

service.run(() => {

});