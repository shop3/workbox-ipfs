/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
/* eslint-enable */

module.exports = {
  mode: 'production',
  target: 'web',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'index.js',
    library: 'lib',
    libraryTarget: 'umd',
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  externals: ['workbox-routing'],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
