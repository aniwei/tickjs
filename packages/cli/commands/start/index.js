const { join, parse } = require('path');
const fs = require('fs-extra');
const globby = require('globby');
const webpack = require('webpack');
const clone = require('clone');

const defaultWebpackConfig = require('../../shared/defaultWebpackConfig');
const env = require('../../shared/env');

const exists = async (filename) => {
  return fs.exists(filename);
}

const handleWebpackConfig = async (tickrc) => {
  const flattenRoutes = tickrc.flattenRoutes;
  const config = clone(defaultWebpackConfig);
  
  flattenRoutes.filter(route => route.path !== '/').forEach(route => {
    const { component } = route;
    const filename = component.replace(/\.\//, '').split('/').join('');

    defaultWebpackConfig.entry[join('pages', filename)] = join(env.src, 'pages', component);
  });

  config.mode = 'development';
  config.resolve.alias = tickrc.alias;

  const compiler = webpack(config);
  compiler.watch({}, (error, stat) => {
    if (stat.hasErrors()) {
      console.log(stat.toJson().errors)
    }
  });
}

const handleThirdParty = (tickrc) => {
  const { thirdParty } = tickrc;


}

const handleMiniProgramPages = async (tickrc) => {
  const flattenRoutes = tickrc.flattenRoutes;
  const files = await globby([
    `**/**`, 
    `!static/**`,
    `!miniprogram_engine/**`,
    `!miniprogram_npm/**`,
    `!app.js`, 
    `!app.json`, 
    `!app.wxss`, 
    `!sitemap.json`,
  ], {
    cwd: env.dist
  });

  const newFiles = files.slice();

  console.log(flattenRoutes)

  flattenRoutes
    // miniprogram not supoort / route
    .filter(route => route.path !== '/')
    .forEach(async route => {
      const { files: routeFiles, component, config } = route;

      if (routeFiles.some(file => {
        return newFiles.indexOf(file) === -1;
      })) {
        route.isMounted = false;
        
        const [
          js, json, wxml
        ] = routeFiles.map(file => {
          return join(env.dist, file);
        });

        console.log(js, json, wxml, routeFiles)

        // /Admin/SignIn/ => AdminSignIn
        const filename = component
          .replace(/\.\//, '')
          .split('/')
          .join('');

        const jsString = [
          `// ${component}`,
          `import { ViewController } from '@tickjs/weapp';`,
          `import ${filename} from '${filename}'\n;`,
          `const controller = new ViewController('${route}', ${filename});`,
          `controller.register();`
        ].join('\n');

        const wxmlString = [
          `<block wx:if={{DOMContentLoaded}}><html elements="{{elmements}}" /></block>`,
          `<block wx:else>{{elements}}</block>`
        ].join('\n');

        await Promise.all([
          fs.writeFile(js, jsString),
          fs.writeJson(json, config),
          fs.writeFile(wxml, wxmlString)
        ]);


      } else {
        route.isMounted = true;

        await fs.writeJson(
          join(env.dist, routeFiles[1]),
          {
            ...tickrc.defaultNavigationConfig,
            ...route.config
          }
        );

        // 剔除文件
        routeFiles.forEach(file => {
          const index = newFiles.indexOf(file);

          if (index > -1) {
            newFiles.splice(index, 1);
          }
        });
      }

      return route;
  });

  if (newFiles.length > 0) {
    // 需要删除多余的
  } 


}

const handleAppJsonFile = async (tickrc) => {
  const file = join(env.dist, 'app.json');

  // 创建
  if (!await exists(file)) {
    await fs.writeFile(file, ``);
  }

  const json = {
    window: tickrc.window,
    pages: tickrc.flattenRoutes.filter(route => route.path !== '/').map(route => {
      const { path } = route;

      return path[0] === '/' ? path.slice(1) : path;
    }),
    tabBar: tickrc.appTabBar
  }

  return await fs.writeJson(file, json, { spaces: 2 });
}

const handleAppTabBar = (tickrc) => {
  const { tabBar } = tickrc;
  let appTabBar;

  if (tabBar) {
    const { items, ...tabBarConfig } = tabBar;

    appTabBar = tabBarConfig;

    appTabBar.list = items.map(item => {
      return {
        pagePath: item.path,
        selectedIcon: item
      }
    });
  }

  return appTabBar;
}

const handleAppPages = (tickrc) => {
  const { routes } = tickrc;
  const flattenRoutes = [];
  const forEach = (route, index, prefix) => {
    const { path, component, config, routes } = route;
    const parsed = parse(path);

    const removeRootPath = path[0] === '/' ? 
      path.slice(1) : path;

    flattenRoutes.push({
      files: [
        removeRootPath + '.js',
        removeRootPath + '.json',
        removeRootPath + '.wxml',
      ],
      path,
      parsed,
      component,
      config: config || {
        ...tickrc.defaultNavigationConfig
      }
    });

    if (routes && routes.length > 0) {
      prefix = prefix ? prefix + path : path;

      routes.forEach((route, index) => {
        forEach(route, index, prefix);
      });
    }
  }

  routes.forEach((route, index) => {
    forEach(route, index)
  });

  return flattenRoutes;
}

module.exports = async function start () {
  const exist = await exists(env.tickrc);

  if (exist) {
    const tickrc = require(env.tickrc);
    const dist = env.dist;

    const flattenRoutes = handleAppPages(tickrc);
    const appTabBar = handleAppTabBar(tickrc);

    tickrc.flattenRoutes = flattenRoutes;
    tickrc.appTabBar = appTabBar;

    if (!await exists(dist)) {
      await fs.mkdirp(dist);
    }

    await handleAppJsonFile(tickrc);
    await handleMiniProgramPages(tickrc);
    await handleWebpackConfig(tickrc);
  } else {

  }
}