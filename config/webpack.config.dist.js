const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(process.env.PWD);

const ExtractTextPlugin = require('extract-text-webpack-plugin');

require('babel-polyfill');

module.exports = {
  name: 'ringa-fw-react',
  node: {
    module: "empty",
    fs: "empty"
  },
  entry: {
    app: path.resolve(ROOT_PATH, 'src/index.js')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
      ringa: path.resolve(__dirname, '../node_modules/ringa'),
      'react-ringa': path.resolve(__dirname, '../node_modules/react-ringa'),
      'react-fw-core': path.resolve(__dirname, '../node_modules/react-fw-core'),
      'moment': path.resolve(__dirname, '../node_modules/moment'),
      'trie-search': path.resolve(__dirname, '../node_modules/trie-search')
    }
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
    'ringa': {
      root: 'Ringa',
      commonjs2: 'ringa',
      commonjs: 'ringa',
      amd: 'ringa',
      umd: 'ringa',
    },
    'react-ringa': {
      root: 'ReactRinga',
      commonjs2: 'react-ringa',
      commonjs: 'react-ringa',
      amd: 'react-ringa',
      umd: 'react-ringa',
    },
    'moment': {
      root: 'Moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment',
      umd: 'moment',
    },
    'highlight.js': {
      root: 'Highlight',
      commonjs2: 'highlight.js',
      commonjs: 'highlight.js',
      amd: 'highlight.js',
      umd: 'highlight.js',
    },
    'showdown': {
      root: 'Showdown',
      commonjs2: 'showdown',
      commonjs: 'showdown',
      amd: 'showdown',
      umd: 'showdown',
    },
  },
  module: {
    loaders: [
      {
        test: /\.(md|txt)$/,
        loader: 'raw-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react'],
            compact: false
          }
        }
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.png$/,
        loader: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/png'
          }
        }
      },
      {
        test: /\.(jpg|jpeg|gif|svg|woff|woff2|ttf|eot|svg)$/,
        loader: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/[hash].[ext]'
          }
        }
      }
    ]
  },
  devtool: 'eval',
  output: {
    path: path.join(ROOT_PATH, 'dist'),
    filename: 'ringa-fw-react.min.js',
    publicPath: '/',
    library: 'Ringa Framework React',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false
    }),
    new ExtractTextPlugin({
      filename: 'ringa-theme-classic.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: {
        except: [
          '$controller',
          '$thread',
          '$ringaEvent',
          'event',
          '$customEvent',
          '$lastEvent',
          '$target',
          '$detail',
          'done',
          'fail',
          '$lastPromiseResult',
          '$lastPromiseError',
          'Command',
          'EventExecutor',
          'FunctionExecutor',
          'IifExecutor',
          'ParallelExecutor',
          'PromiseExecutor',
          'SleepExecutor',
          'SpawnExecutor',
          'Bus',
          'Controller',
          'ExecutorAbstract',
          'Model',
          'ModelWatcher',
          'RingaEvent',
          'RingaEventFactory',
          'RingaHashArray',
          'RingaObject',
          'Thread',
          'ThreadFactory',
          'InspectorModel',
          'inspectorModel',
          'InspectorController',
          'inspectorController',
          'thread']
      }
    })
  ]
};
