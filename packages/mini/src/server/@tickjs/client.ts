import { ClientRuntime } from './ClientRuntime'

export function getApplicationClientRuntime (uri: string) {
  const client = ClientRuntime.sharedRuntime(uri);

  return client;
}