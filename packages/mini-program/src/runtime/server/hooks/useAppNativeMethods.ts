import qs from 'qs';
import URL from 'url-parse';
import { useContext } from 'react';
import { useAppNativeMethod } from './useAppNativeMethod';
import { AppContext } from '../componnets/TickApp/AppContext';

const { stringify } = JSON;

export function useAppNativeMethods ({ __TICK_MINI_PROGRAM }) {
  const { appservice, appnavigator } = useContext(AppContext);

  const nativeMethods = useAppNativeMethod(
    `service.getSystemInfo`, 
    ({ callbackId, name }) => {
      appservice
        .invoke(callbackId, name)
        .success(__TICK_MINI_PROGRAM.system)
        .sync()
    }
  );

  useAppNativeMethod(
    `service.getNetworkType`, 
    ({ callbackId, name }) => 
      appservice.invoke(callbackId, name)
        .success({
          networkType: __TICK_MINI_PROGRAM.system.networkType
        })
        .sync()
  );

  useAppNativeMethod(
    `service.getStorage`,
    ({ callbackId, name, data: { key } }) => {
      const exec = appservice.invoke(callbackId, name).async();
      const result = __TICK_MINI_PROGRAM.storage.getItem(key);

      if (result) {
        exec.success({ data: result });
      } else {
        exec.fail();
      }
    }
  );

  useAppNativeMethod(
    `service.getStorageSync`,
    ({ callbackId, name, data: { key } }) => {
      const exec = appservice.invoke(callbackId, name).sync();
      const result = __TICK_MINI_PROGRAM.storage.getItem(key);

      if (result) {
        exec.success({ data: result });
      } else {
        exec.fail();
      }
    }
  );

  useAppNativeMethod(
    `service.setStorage`,
    ({ callbackId, name, data: { key, data } }) => {
      appservice.invoke(callbackId, name).async().success();
       __TICK_MINI_PROGRAM.storage.setItem(key, data);
    }
  );

  useAppNativeMethod(
    `service.setStorageSync`,
    ({ callbackId, name, data: { key, data } }) => {
      appservice.invoke(callbackId, name).sync().success();
       __TICK_MINI_PROGRAM.storage.setItem(key, data);
    }
  );

  useAppNativeMethod(
    `service.createRequestTask`, 
    {
      id: 0,
      invoke ({ callbackId, name, data }) {
        const id = this.id++;
        appservice.invoke(callbackId, name)
          .success({ requestTaskId: id })
          .sync();

        __TICK_MINI_PROGRAM
          .remote
          .createRequestTask(stringify(data))
          .then(res => res.json())
          .then(res => {
            appservice.subscribeHandler('onRequestTaskStateChange', {
              requestTaskId: id,
              state: 'success',
              data: stringify(res.data),
              statusCode: res.statusCode,
              header: res.header
            });
          }).catch(error => {
            appservice.subscribeHandler('onRequestTaskStateChange', {
              requestTaskId: id,
              state: 'error',
              statusCode: error.statusCode,
              header: error.header
            });
          })
      }
    }
  )

  useAppNativeMethod(
    `service.login`,
    ({ callbackId, name, data }) => {
      __TICK_MINI_PROGRAM
      .remote
      .login(stringify(data))
      .then(res => res.json())
      .then((res) => {
        appservice
          .invoke(callbackId, name)
          .success(res)
          .async();
      }).catch(error => {
        appservice
          .invoke(callbackId, name)
          .fail(error)
          .async();
      });
    }
  );

  useAppNativeMethod(
    `service.navigateTo`,
    ({ callbackId, name, data }) => {
      const url = new URL(data.url);
      const query = qs.parse(url.query.slice(1));

      appnavigator.push(url, {
        ...query,
        __TYPE: 'navigateTo'
      });
      appservice
        .invoke(callbackId, name)
        .success()
        .async()
    }
  );

  useAppNativeMethod(
    `service.redirectTo`,
    ({ callbackId, name, data }) => {
      const url = new URL(data.url);
      const query = qs.parse(url.query.slice(1));

      appnavigator.push(url, query);
      appservice
        .invoke(callbackId, name)
        .success()
        .async()
    }
  );

  useAppNativeMethod(
    `service.switchTab`,
    ({ callbackId, name, data }) => {
      const url = new URL(data.url);
      const query = qs.parse(url.query.slice(1));

      appnavigator.navigate(url, {
        ...query,
        __TYPE: 'switchTab'
      });
      appservice
        .invoke(callbackId, name)
        .success()
        .async()
    }
  );

  useAppNativeMethod(
    `service.navigateBack`,
    ({ callbackId, name, data }) => {
      const { delta } = data;

      appnavigator.pop(delta)
      appservice
        .invoke(callbackId, name)
        .success()
        .async()
    }
  )

  useAppNativeMethod(
    `service.setNavigationBarTitle`,
    ({ callbackId, name, data }) => {
      const { title } = data;

      appnavigator.setNavigationBarTitle(title)
      appservice
        .invoke(callbackId, name)
        .success()
        .async()
    }
  )

  useAppNativeMethod(
    `service.setNavigationBarColor`,
    ({ callbackId, name, data }) => {
      appnavigator.setNavigationBarColor(data)
      appservice
        .invoke(callbackId, name)
        .success()
        .async()
    }
  )

  return nativeMethods;
}