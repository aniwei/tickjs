import path from 'path';

export const config = {
  entry: {
    appservice: path.resolve(__dirname, 'appservice.ts'),
    // appview: path.resolve(__dirname, 'appview.ts'),
        // 'eventsource-polyfill',
        // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `[name].js`,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin()
  ]

}