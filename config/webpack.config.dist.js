const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(process.env.PWD);

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
    extensions: ['.js', '.jsx']
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
    ringa: {
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
      umd: 'react-ringa'
    },
    'moment': {
      root: 'Moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment',
      umd: 'moment'
    }
  },
  module: {
    loaders: [
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
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              includePaths: [
                path.join(__dirname, 'node_modules'),
                path.join(__dirname, 'src'),
                __dirname
              ]
            }
          }
        ]
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
  devtool: 'source-map',
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
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
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
