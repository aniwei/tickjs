import KoaCompose from 'koa-compose';
import webpack from 'webpack';
import hotMiddleware from 'webpack-hot-middleware';
import devMiddleware from 'webpack-dev-middleware';

import { PassThrough } from 'stream';
import { config } from './webpack.config';

const defaultOptions = {
  headers: {},
  stats: {
    colors: true
  }
}

export default function runtime (options?) {
  const compile = webpack(config);

  options = { 
    ...defaultOptions, 
    ...options 
  };

  const dev = devMiddleware(compile, {
    ...options,
    publicPath: config.output.publicPath
  });
  const hot = hotMiddleware(compile, options)

  return KoaCompose([
    async (context, next) => {
      await dev(context.req, {
        end: (content) => { 
          context.body = content;
        },
        setHeader: (name, value) => {
          context.set(name, value)
        }
      }, next)
    },
    async (context, next) => {
      const stream = new PassThrough();
      
      context.body = stream;
      await hot(context.req, {
        write: stream.write.bind(stream),
        writeHead: (status, headers) => {
          context.status = status;
          context.set(headers);
        }
      }, next)

    }
  ])
}