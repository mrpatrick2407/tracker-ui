const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack')
const browserConfig = {
  mode: 'development',
  entry: { app: ['./browser/App.jsx'] },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  ie: '11',
                  edge: '112',
                  safari: '10',
                  firefox: '111',
                  chrome: '112',
                },
              }],
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },
  devtool: 'source-map',
  plugins: [    new webpack.DefinePlugin({      __isBrowser__: 'true',    }),  ],
};

const serverConfig = {
  mode: 'development',
  entry: { server: ['./server/uiserver.js'] },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: { node: '18' },
              }],
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  devtool: 'source-map',
  plugins: [    new webpack.DefinePlugin({      __isBrowser__: 'false',    }),  ],
};

module.exports = [browserConfig, serverConfig];