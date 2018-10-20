import * as fs from 'fs';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const appDirectory = fs.realpathSync(process.cwd());

export const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpackModule: webpack.Configuration[] = [
  {
    stats: 'errors-only',
    entry: {
      index: resolveApp('src/react-starter/client.tsx')
    },
    devtool: 'cheap-module-source-map',
    output: {
      // publicPath: '/',
      chunkFilename: '[name].chunk.js',
      filename: '[name].js',
      pathinfo: true,
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                experimentalWatchApi: true
              }
            }
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: true,
        watch: resolveApp('src/react-starter'),
        tsconfig: resolveApp('tsconfig.json'),
        tslint: resolveApp('tslint.json')
      }),
      new HtmlWebpackPlugin({
        chunks: ['index'],
        template: './src/react-starter/index.html',
        filename: 'index.html'
      })
    ],
    resolve: {
      extensions: ['.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx']
    },
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
      __dirname: false,
      __filename: false
    }
  }
];

export default webpackModule;
