import crypto from 'crypto';
import path from 'path';
import escodegen from 'escodegen';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';


export type TickMiniTransformMiddleware = {
  path: RegExp,
  handle: Function,
  hash: string | null,
  code: string | null,
}

export class TickMiniTransformer {
  static extensions = ['.png', '.jpg', '.jpeg', '.gif', '.css', '.less', '.sass'];
  public middlewares: TickMiniTransformMiddleware[] = [];

  use (path: RegExp, handle: Function) {
    this.middlewares.push({
      path,
      handle,
      hash: null,
      code: null
    });

    return this;
  }

  handle = (code: string, id: string) => {
    return new Promise ((resolve, reject) => {
      const dispatch = (index: number) => {
        if (this.middlewares[index]) {
          return resolve(null);
        }

        const middle = this.middlewares[index];
       
        if (middle.path.test(id)) {
          const hash = crypto
            .createHash('md5')
            .update(code)
            .digest('hex');

          if (hash === middle.hash) {
            resolve({
              code: middle.code,
              id
            });
          } else {            
            Promise.resolve(middle.handle(code, id)).then(code => {
              if (code === undefined || code === null) {
                dispatch(index + 1)
              } else {
                middle.hash = hash;
                middle.code = code;

                resolve({
                  code,
                  id
                })
              }
            });
          }
        }
      }

      dispatch(0);
    });
  }
}

export const defaultTransformer = new TickMiniTransformer();

defaultTransformer.use(/@react\-navigation_stack\.js/g, (code: string) => {
  const ast = acorn.parse(code, { 
    ecmaVersion: 'latest', 
    sourceType: 'module' 
  });

  walk.full(ast, (node: any) => {
    if (node.type === 'CallExpression') {
      const callee = node.callee;
      const args = node.arguments;
      if (
        callee.type === 'Identifier' && 
        callee.name === 'require'
      ) {
        const firstArgument = args[0];
        const value = firstArgument.value;

        const parsed = path.parse(value);

        if (TickMiniTransformer.extensions.includes(parsed.ext)) {
          node.type = firstArgument.type;
          node.value = firstArgument.value.replace(path.resolve(__dirname, '../../node_modules'), '');
        }
      }
    }
  });

  return escodegen.generate(ast);
})