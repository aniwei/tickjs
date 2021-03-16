(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // ../node_modules/axios/lib/helpers/bind.js
  var require_bind = __commonJS((exports, module) => {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  });

  // ../node_modules/axios/lib/utils.js
  var require_utils = __commonJS((exports, module) => {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  });

  // ../node_modules/axios/lib/helpers/buildURL.js
  var require_buildURL = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  });

  // ../node_modules/axios/lib/core/InterceptorManager.js
  var require_InterceptorManager = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled,
        rejected
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  });

  // ../node_modules/axios/lib/core/transformData.js
  var require_transformData = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    module.exports = function transformData(data, headers, fns) {
      utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });
      return data;
    };
  });

  // ../node_modules/axios/lib/cancel/isCancel.js
  var require_isCancel = __commonJS((exports, module) => {
    "use strict";
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  });

  // ../node_modules/axios/lib/helpers/normalizeHeaderName.js
  var require_normalizeHeaderName = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  });

  // ../node_modules/axios/lib/core/enhanceError.js
  var require_enhanceError = __commonJS((exports, module) => {
    "use strict";
    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code
        };
      };
      return error;
    };
  });

  // ../node_modules/axios/lib/core/createError.js
  var require_createError = __commonJS((exports, module) => {
    "use strict";
    var enhanceError = require_enhanceError();
    module.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  });

  // ../node_modules/axios/lib/core/settle.js
  var require_settle = __commonJS((exports, module) => {
    "use strict";
    var createError = require_createError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  });

  // ../node_modules/axios/lib/helpers/cookies.js
  var require_cookies = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  });

  // ../node_modules/axios/lib/helpers/isAbsoluteURL.js
  var require_isAbsoluteURL = __commonJS((exports, module) => {
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  });

  // ../node_modules/axios/lib/helpers/combineURLs.js
  var require_combineURLs = __commonJS((exports, module) => {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  });

  // ../node_modules/axios/lib/core/buildFullPath.js
  var require_buildFullPath = __commonJS((exports, module) => {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  });

  // ../node_modules/axios/lib/helpers/parseHeaders.js
  var require_parseHeaders = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  });

  // ../node_modules/axios/lib/helpers/isURLSameOrigin.js
  var require_isURLSameOrigin = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  });

  // ../node_modules/axios/lib/adapters/xhr.js
  var require_xhr = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === "text" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(resolve, reject, response);
          request = null;
        };
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            if (config.responseType !== "json") {
              throw e;
            }
          }
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
            request.abort();
            reject(cancel);
            request = null;
          });
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  });

  // ../node_modules/axios/lib/defaults.js
  var require_defaults = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    var defaults = {
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data)) {
          setContentTypeIfUnset(headers, "application/json;charset=utf-8");
          return JSON.stringify(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (e) {
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults.headers = {
      common: {
        Accept: "application/json, text/plain, */*"
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  });

  // ../node_modules/axios/lib/core/dispatchRequest.js
  var require_dispatchRequest = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData(config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData(response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  });

  // ../node_modules/axios/lib/core/mergeConfig.js
  var require_mergeConfig = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      var valueFromConfig2Keys = ["url", "method", "data"];
      var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
      var defaultToConfig2Keys = [
        "baseURL",
        "transformRequest",
        "transformResponse",
        "paramsSerializer",
        "timeout",
        "timeoutMessage",
        "withCredentials",
        "adapter",
        "responseType",
        "xsrfCookieName",
        "xsrfHeaderName",
        "onUploadProgress",
        "onDownloadProgress",
        "decompress",
        "maxContentLength",
        "maxBodyLength",
        "maxRedirects",
        "transport",
        "httpAgent",
        "httpsAgent",
        "cancelToken",
        "socketPath",
        "responseEncoding"
      ];
      var directMergeKeys = ["validateStatus"];
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      }
      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        }
      });
      utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
      var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });
      utils.forEach(otherKeys, mergeDeepProperties);
      return config;
    };
  });

  // ../node_modules/axios/lib/core/Axios.js
  var require_Axios = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var chain = [dispatchRequest, void 0];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module.exports = Axios;
  });

  // ../node_modules/axios/lib/cancel/Cancel.js
  var require_Cancel = __commonJS((exports, module) => {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module.exports = Cancel;
  });

  // ../node_modules/axios/lib/cancel/CancelToken.js
  var require_CancelToken = __commonJS((exports, module) => {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  });

  // ../node_modules/axios/lib/helpers/spread.js
  var require_spread = __commonJS((exports, module) => {
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  });

  // ../node_modules/axios/lib/helpers/isAxiosError.js
  var require_isAxiosError = __commonJS((exports, module) => {
    "use strict";
    module.exports = function isAxiosError(payload) {
      return typeof payload === "object" && payload.isAxiosError === true;
    };
  });

  // ../node_modules/axios/lib/axios.js
  var require_axios = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      return instance;
    }
    var axios2 = createInstance(defaults);
    axios2.Axios = Axios;
    axios2.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios2.defaults, instanceConfig));
    };
    axios2.Cancel = require_Cancel();
    axios2.CancelToken = require_CancelToken();
    axios2.isCancel = require_isCancel();
    axios2.all = function all(promises) {
      return Promise.all(promises);
    };
    axios2.spread = require_spread();
    axios2.isAxiosError = require_isAxiosError();
    module.exports = axios2;
    module.exports.default = axios2;
  });

  // ../node_modules/axios/index.js
  var require_axios2 = __commonJS((exports, module) => {
    module.exports = require_axios();
  });

  // ../node_modules/tiny-emitter/index.js
  var require_tiny_emitter = __commonJS((exports, module) => {
    function E() {
    }
    E.prototype = {
      on: function(name, callback, ctx) {
        var e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
          fn: callback,
          ctx
        });
        return this;
      },
      once: function(name, callback, ctx) {
        var self = this;
        function listener() {
          self.off(name, listener);
          callback.apply(ctx, arguments);
        }
        ;
        listener._ = callback;
        return this.on(name, listener, ctx);
      },
      emit: function(name) {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for (i; i < len; i++) {
          evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
        return this;
      },
      off: function(name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];
        if (evts && callback) {
          for (var i = 0, len = evts.length; i < len; i++) {
            if (evts[i].fn !== callback && evts[i].fn._ !== callback)
              liveEvents.push(evts[i]);
          }
        }
        liveEvents.length ? e[name] = liveEvents : delete e[name];
        return this;
      }
    };
    module.exports = E;
    module.exports.TinyEmitter = E;
  });

  // ../node_modules/randomcolor/randomColor.js
  var require_randomColor = __commonJS((exports, module) => {
    (function(root, factory) {
      if (typeof exports === "object") {
        var randomColor = factory();
        if (typeof module === "object" && module && module.exports) {
          exports = module.exports = randomColor;
        }
        exports.randomColor = randomColor;
      } else if (typeof define === "function" && define.amd) {
        define([], factory);
      } else {
        root.randomColor = factory();
      }
    })(exports, function() {
      var seed = null;
      var colorDictionary = {};
      loadColorBounds();
      var colorRanges = [];
      var randomColor = function(options) {
        options = options || {};
        if (options.seed !== void 0 && options.seed !== null && options.seed === parseInt(options.seed, 10)) {
          seed = options.seed;
        } else if (typeof options.seed === "string") {
          seed = stringToInteger(options.seed);
        } else if (options.seed !== void 0 && options.seed !== null) {
          throw new TypeError("The seed value must be an integer or string");
        } else {
          seed = null;
        }
        var H, S, B;
        if (options.count !== null && options.count !== void 0) {
          var totalColors = options.count, colors = [];
          for (var i = 0; i < options.count; i++) {
            colorRanges.push(false);
          }
          options.count = null;
          while (totalColors > colors.length) {
            var color = randomColor(options);
            if (seed !== null) {
              options.seed = seed;
            }
            colors.push(color);
          }
          options.count = totalColors;
          return colors;
        }
        H = pickHue(options);
        S = pickSaturation(H, options);
        B = pickBrightness(H, S, options);
        return setFormat([H, S, B], options);
      };
      function pickHue(options) {
        if (colorRanges.length > 0) {
          var hueRange = getRealHueRange(options.hue);
          var hue = randomWithin(hueRange);
          var step = (hueRange[1] - hueRange[0]) / colorRanges.length;
          var j = parseInt((hue - hueRange[0]) / step);
          if (colorRanges[j] === true) {
            j = (j + 2) % colorRanges.length;
          } else {
            colorRanges[j] = true;
          }
          var min = (hueRange[0] + j * step) % 359, max = (hueRange[0] + (j + 1) * step) % 359;
          hueRange = [min, max];
          hue = randomWithin(hueRange);
          if (hue < 0) {
            hue = 360 + hue;
          }
          return hue;
        } else {
          var hueRange = getHueRange(options.hue);
          hue = randomWithin(hueRange);
          if (hue < 0) {
            hue = 360 + hue;
          }
          return hue;
        }
      }
      function pickSaturation(hue, options) {
        if (options.hue === "monochrome") {
          return 0;
        }
        if (options.luminosity === "random") {
          return randomWithin([0, 100]);
        }
        var saturationRange = getSaturationRange(hue);
        var sMin = saturationRange[0], sMax = saturationRange[1];
        switch (options.luminosity) {
          case "bright":
            sMin = 55;
            break;
          case "dark":
            sMin = sMax - 10;
            break;
          case "light":
            sMax = 55;
            break;
        }
        return randomWithin([sMin, sMax]);
      }
      function pickBrightness(H, S, options) {
        var bMin = getMinimumBrightness(H, S), bMax = 100;
        switch (options.luminosity) {
          case "dark":
            bMax = bMin + 20;
            break;
          case "light":
            bMin = (bMax + bMin) / 2;
            break;
          case "random":
            bMin = 0;
            bMax = 100;
            break;
        }
        return randomWithin([bMin, bMax]);
      }
      function setFormat(hsv, options) {
        switch (options.format) {
          case "hsvArray":
            return hsv;
          case "hslArray":
            return HSVtoHSL(hsv);
          case "hsl":
            var hsl = HSVtoHSL(hsv);
            return "hsl(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%)";
          case "hsla":
            var hslColor = HSVtoHSL(hsv);
            var alpha = options.alpha || Math.random();
            return "hsla(" + hslColor[0] + ", " + hslColor[1] + "%, " + hslColor[2] + "%, " + alpha + ")";
          case "rgbArray":
            return HSVtoRGB(hsv);
          case "rgb":
            var rgb = HSVtoRGB(hsv);
            return "rgb(" + rgb.join(", ") + ")";
          case "rgba":
            var rgbColor = HSVtoRGB(hsv);
            var alpha = options.alpha || Math.random();
            return "rgba(" + rgbColor.join(", ") + ", " + alpha + ")";
          default:
            return HSVtoHex(hsv);
        }
      }
      function getMinimumBrightness(H, S) {
        var lowerBounds = getColorInfo(H).lowerBounds;
        for (var i = 0; i < lowerBounds.length - 1; i++) {
          var s1 = lowerBounds[i][0], v1 = lowerBounds[i][1];
          var s2 = lowerBounds[i + 1][0], v2 = lowerBounds[i + 1][1];
          if (S >= s1 && S <= s2) {
            var m = (v2 - v1) / (s2 - s1), b = v1 - m * s1;
            return m * S + b;
          }
        }
        return 0;
      }
      function getHueRange(colorInput) {
        if (typeof parseInt(colorInput) === "number") {
          var number = parseInt(colorInput);
          if (number < 360 && number > 0) {
            return [number, number];
          }
        }
        if (typeof colorInput === "string") {
          if (colorDictionary[colorInput]) {
            var color = colorDictionary[colorInput];
            if (color.hueRange) {
              return color.hueRange;
            }
          } else if (colorInput.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
            var hue = HexToHSB(colorInput)[0];
            return [hue, hue];
          }
        }
        return [0, 360];
      }
      function getSaturationRange(hue) {
        return getColorInfo(hue).saturationRange;
      }
      function getColorInfo(hue) {
        if (hue >= 334 && hue <= 360) {
          hue -= 360;
        }
        for (var colorName in colorDictionary) {
          var color = colorDictionary[colorName];
          if (color.hueRange && hue >= color.hueRange[0] && hue <= color.hueRange[1]) {
            return colorDictionary[colorName];
          }
        }
        return "Color not found";
      }
      function randomWithin(range) {
        if (seed === null) {
          var golden_ratio = 0.618033988749895;
          var r = Math.random();
          r += golden_ratio;
          r %= 1;
          return Math.floor(range[0] + r * (range[1] + 1 - range[0]));
        } else {
          var max = range[1] || 1;
          var min = range[0] || 0;
          seed = (seed * 9301 + 49297) % 233280;
          var rnd = seed / 233280;
          return Math.floor(min + rnd * (max - min));
        }
      }
      function HSVtoHex(hsv) {
        var rgb = HSVtoRGB(hsv);
        function componentToHex(c) {
          var hex2 = c.toString(16);
          return hex2.length == 1 ? "0" + hex2 : hex2;
        }
        var hex = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
        return hex;
      }
      function defineColor(name, hueRange, lowerBounds) {
        var sMin = lowerBounds[0][0], sMax = lowerBounds[lowerBounds.length - 1][0], bMin = lowerBounds[lowerBounds.length - 1][1], bMax = lowerBounds[0][1];
        colorDictionary[name] = {
          hueRange,
          lowerBounds,
          saturationRange: [sMin, sMax],
          brightnessRange: [bMin, bMax]
        };
      }
      function loadColorBounds() {
        defineColor("monochrome", null, [[0, 0], [100, 0]]);
        defineColor("red", [-26, 18], [[20, 100], [30, 92], [40, 89], [50, 85], [60, 78], [70, 70], [80, 60], [90, 55], [100, 50]]);
        defineColor("orange", [18, 46], [[20, 100], [30, 93], [40, 88], [50, 86], [60, 85], [70, 70], [100, 70]]);
        defineColor("yellow", [46, 62], [[25, 100], [40, 94], [50, 89], [60, 86], [70, 84], [80, 82], [90, 80], [100, 75]]);
        defineColor("green", [62, 178], [[30, 100], [40, 90], [50, 85], [60, 81], [70, 74], [80, 64], [90, 50], [100, 40]]);
        defineColor("blue", [178, 257], [[20, 100], [30, 86], [40, 80], [50, 74], [60, 60], [70, 52], [80, 44], [90, 39], [100, 35]]);
        defineColor("purple", [257, 282], [[20, 100], [30, 87], [40, 79], [50, 70], [60, 65], [70, 59], [80, 52], [90, 45], [100, 42]]);
        defineColor("pink", [282, 334], [[20, 100], [30, 90], [40, 86], [60, 84], [80, 80], [90, 75], [100, 73]]);
      }
      function HSVtoRGB(hsv) {
        var h = hsv[0];
        if (h === 0) {
          h = 1;
        }
        if (h === 360) {
          h = 359;
        }
        h = h / 360;
        var s = hsv[1] / 100, v = hsv[2] / 100;
        var h_i = Math.floor(h * 6), f = h * 6 - h_i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), r = 256, g = 256, b = 256;
        switch (h_i) {
          case 0:
            r = v;
            g = t;
            b = p;
            break;
          case 1:
            r = q;
            g = v;
            b = p;
            break;
          case 2:
            r = p;
            g = v;
            b = t;
            break;
          case 3:
            r = p;
            g = q;
            b = v;
            break;
          case 4:
            r = t;
            g = p;
            b = v;
            break;
          case 5:
            r = v;
            g = p;
            b = q;
            break;
        }
        var result = [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
        return result;
      }
      function HexToHSB(hex) {
        hex = hex.replace(/^#/, "");
        hex = hex.length === 3 ? hex.replace(/(.)/g, "$1$1") : hex;
        var red = parseInt(hex.substr(0, 2), 16) / 255, green = parseInt(hex.substr(2, 2), 16) / 255, blue = parseInt(hex.substr(4, 2), 16) / 255;
        var cMax = Math.max(red, green, blue), delta = cMax - Math.min(red, green, blue), saturation = cMax ? delta / cMax : 0;
        switch (cMax) {
          case red:
            return [60 * ((green - blue) / delta % 6) || 0, saturation, cMax];
          case green:
            return [60 * ((blue - red) / delta + 2) || 0, saturation, cMax];
          case blue:
            return [60 * ((red - green) / delta + 4) || 0, saturation, cMax];
        }
      }
      function HSVtoHSL(hsv) {
        var h = hsv[0], s = hsv[1] / 100, v = hsv[2] / 100, k = (2 - s) * v;
        return [
          h,
          Math.round(s * v / (k < 1 ? k : 2 - k) * 1e4) / 100,
          k / 2 * 100
        ];
      }
      function stringToInteger(string) {
        var total = 0;
        for (var i = 0; i !== string.length; i++) {
          if (total >= Number.MAX_SAFE_INTEGER)
            break;
          total += string.charCodeAt(i);
        }
        return total;
      }
      function getRealHueRange(colorHue) {
        if (!isNaN(colorHue)) {
          var number = parseInt(colorHue);
          if (number < 360 && number > 0) {
            return getColorInfo(colorHue).hueRange;
          }
        } else if (typeof colorHue === "string") {
          if (colorDictionary[colorHue]) {
            var color = colorDictionary[colorHue];
            if (color.hueRange) {
              return color.hueRange;
            }
          } else if (colorHue.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
            var hue = HexToHSB(colorHue)[0];
            return getColorInfo(hue).hueRange;
          }
        }
        return [0, 360];
      }
      return randomColor;
    });
  });

  // ../src/server/@tickjs/ServiceRuntime.ts
  var import_axios = __toModule(require_axios2());

  // ../src/server/@tickjs/Runtime.ts
  var import_tiny_emitter = __toModule(require_tiny_emitter());
  var MessageType;
  (function(MessageType2) {
    MessageType2["PUBLISH"] = "publishHandler";
    MessageType2["SUBSCRIBE"] = "subscribeHandler";
    MessageType2["INVOKE"] = "invokeHandler";
    MessageType2["CALLBACK"] = "invokeCallbackHandler";
  })(MessageType || (MessageType = {}));
  var Runtime = class extends import_tiny_emitter.TinyEmitter {
    constructor(sender, receiver) {
      super();
      this.sender = null;
      this.receiver = null;
      this.onMessage = (message) => {
        switch (message.type) {
          case MessageType.CALLBACK: {
            this.emit(message.name, message);
            break;
          }
          case MessageType.INVOKE: {
            this.emit(message.name, message);
            break;
          }
          case MessageType.PUBLISH: {
            this.emit(message.name, message);
            break;
          }
          case MessageType.SUBSCRIBE: {
            this.emit(message.name, message);
            break;
          }
        }
      };
      this.sender = sender;
      this.receiver = receiver;
      this.receiver.addEventListener("message", (event) => {
        this.onMessage(event.data);
      });
    }
    subscribe(message) {
      this.sender({
        ...message,
        type: MessageType.SUBSCRIBE
      });
    }
    callback(message) {
      this.sender({
        ...message,
        type: MessageType.CALLBACK
      });
    }
    invoke(message) {
      this.sender.postMessage({
        ...message,
        type: MessageType.INVOKE
      });
    }
    publish(message) {
      this.sender.postMessage({
        ...message,
        type: MessageType.PUBLISH
      });
    }
  };

  // ../src/server/@tickjs/WeixinJSCore.ts
  var import_tiny_emitter2 = __toModule(require_tiny_emitter());

  // ../src/server/@tickjs/shared.ts
  var import_randomcolor = __toModule(require_randomColor());
  var console = globalThis.console;
  function debug(namespace, type) {
    const prefix = ["%c%s%c%s", `color:` + (0, import_randomcolor.default)(), `\u3010${namespace}\u3011`];
    const rest = (0, import_randomcolor.default)();
    return function(...argv) {
      console[type](...prefix, "color:" + rest, argv.map((value) => {
        const t = typeof value;
        if (t === "string" || t === "number") {
          return value;
        } else if (t === "boolean") {
          return String(value);
        } else if (t === "object") {
          return JSON.stringify(value);
        }
      }).join(", "));
    };
  }

  // ../src/server/@tickjs/WeixinJSCore.ts
  var JSCoreDebug = debug("WeixinJSCore", "info");
  var WeixinJSCore = class extends import_tiny_emitter2.TinyEmitter {
    invokeHandler(name, options, callbackId) {
      JSCoreDebug(`invokeHandler`, `\u63A5\u53E3:`, name, `\u6570\u636E:`, options, `\u56DE\u8C03\u51FD\u6570:`, callbackId);
      this.emit(name, {
        name,
        options,
        callbackId
      });
    }
    publishHandler(name, data, webviewId) {
      JSCoreDebug(`publishHandler`, `\u4E8B\u4EF6:`, name, `\u6570\u636E:`, data, `WebViewId:`, webviewId);
      this.emit(name, {
        name,
        data,
        webviewId
      });
    }
  };

  // ../src/server/@tickjs/ServiceRuntime.ts
  var _ServiceRuntime = class extends Runtime {
    constructor(sender, receiver) {
      super(sender, receiver);
      this.WeixinJSCore = null;
      this.context = null;
      this.WeixinJSCore = new WeixinJSCore();
    }
    static sharedServiceRuntime() {
      return this.runtime = new _ServiceRuntime(globalThis, globalThis);
    }
    define(propName, value) {
      Object.defineProperty(globalThis, propName, {
        get() {
          return value;
        }
      });
      return this;
    }
    script(uri) {
      importScripts(uri);
    }
    run(callback) {
      import_axios.default.get("/@tickjs/context").then(async (res) => {
        const context = res.data;
        this.context = context;
        this.define("__wxConfig", context.config).define("WeixinJSCore", this.WeixinJSCore);
        this.script(`/@weixin/wxservice`);
        this.script(`/@tickjs/app/service`);
        callback(context);
      });
    }
  };
  var ServiceRuntime = _ServiceRuntime;
  ServiceRuntime.runtime = null;
  ServiceRuntime.Function = Function;
  ServiceRuntime.eval = eval;
  var service = ServiceRuntime.sharedServiceRuntime();
  service.WeixinJSCore.on("getSystemInfo", (data) => {
    WeixinJSBridge.invokeCallbackHandler(data.callbackId, {
      errMsg: "getSystemInfo:ok",
      ...service.context.config.system
    });
  });
  service.run(() => {
    service.publish({
      name: "appserviceready"
    });
  });
})();
//# sourceMappingURL=.ServiceRuntime.js.map
