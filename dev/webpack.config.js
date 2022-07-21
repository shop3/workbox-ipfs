/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-enable */

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  entry: {
    index: path.resolve(__dirname, './index.ts'),
    sw: path.resolve(__dirname, './sw.ts'),
    'workbox-sw': require.resolve('workbox-sw'),
  },
  output: {
    path: path.resolve(__dirname, '/public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    fallback: {
      buffer: require.resolve('buffer'),
      util: require.resolve('util'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      fs: false,
    },
    alias: {
      'file-type': path.join(process.cwd(), 'node_modules/file-type/browser.js'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      excludeChunks: ['sw', 'workbox-sw'],
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
      const mod = resource.request.replace(/^node:/, '');
      switch (mod) {
        case 'buffer':
          resource.request = 'buffer';
          break;
        case 'stream':
          resource.request = 'stream';
          break;
        default:
          throw new Error(`Not found ${mod}`);
      }
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    https: true,
    compress: true,
    port: 9000,
    open: true,
  },
};
