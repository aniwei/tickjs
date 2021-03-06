import axios from 'axios';

export class NativeMethodsResponse {
  static json (body) {
    const response = new NativeMethodsResponse();
    return response.json(body);
  }

  static text (body) {
    const response = new NativeMethodsResponse();
    return response.text(body);
  }

  static throw (body) {
    const response = new NativeMethodsResponse();
    return response.throw(body);
  }

  public type: string | null = null;
  public body: any | null = null;
  public status: number | null = null;

  json (body) {
    this.type = 'application/json';
    this.body = body;
    this.status = 200;

    return this;
  }

  text (body) {
    this.type = 'text/html';
    this.body = body;
    this.status = 200;
    return this;
  }

  throw (body) {
    this.type = 'application/json';
    this.body = body;
    this.status = 400;
    return this;
  }
}

export class NativeMethods {
  public methods: Map<string, Function | any> = new Map();
  public options: any | null = null;

  constructor (options) {
    this.options = { 
      beforeRequest () {},
      afterRequest () {},
      ...options 
    }
  }

  registry (name, method) {
    this.methods.set(name, method);
    return this;
  }

  request = async (name, context) => {
    const { beforeRequest, afterRequest } = this.options;
    const request = this.methods.get(name);

    if (request) {
      const result = (
        await beforeRequest(name, context) || 
        await (typeof request === 'function' ? 
          request(context) : 
          request.request(context))
      );

      const { type, body, status } = result;
        
      context.body = body;
      context.type = type;
      context.status = status;

      await afterRequest(result, context);;
    }
  }
}


export function getDefaultNativeMethods (options?) {
  const nativeMethods = new NativeMethods(options);

  nativeMethods.registry('createRequestTask', {
    getRequestOptions (context) {
      const { header, method, url, responseType, timeout } = context.request.body;

      return {
        url,
        timeout,  
        responseType,
        method: method.toUpperCase(),
        headers: {
          ...header
        }
      }
    },

    async request (context) {
      const options = this.getRequestOptions(context);

      try {
        const res = await axios.request(options);
    
        return NativeMethodsResponse.json({ 
          data: res.data, 
          statusCode: res.status, 
          header: res.headers 
        });
      } catch (error) {
        return NativeMethodsResponse.throw(error.response.data);
      }
    }
  });


  nativeMethods.registry('login', async (context) => {
    return NativeMethodsResponse.json({
      code: 'test'
    });
  });

  return nativeMethods;
}