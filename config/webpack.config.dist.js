const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(process.env.PWD);
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const UGLIFY_WHITELIST = require('./uglifyWhitelist.json');

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
      'trie-search': path.resolve(__dirname, '../node_modules/trie-search'),
      'showdown': path.resolve(__dirname, '../node_modules/showdown'),
      'highlight.js': path.resolve(__dirname, '../node_modules/highlight.js')
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
    'ringa-fw-core': {
      root: 'Ringa FW Core',
      commonjs2: 'ringa-fw-core',
      commonjs: 'ringa-fw-core',
      amd: 'ringa-fw-core',
      umd: 'ringa-fw-core',
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
    'flag-icon-css': {
      root: 'Flag Icon CSS',
      commonjs2: 'flag-icon-css',
      commonjs: 'flag-icon-css',
      amd: 'flag-icon-css',
      umd: 'flag-icon-css',
    }
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
            limit: 256,
            mimetype: 'image/png'
          }
        }
      },
      {
        test: /\.(jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: {
          loader: 'url-loader',
          options: {
            limit: 256,
            name: 'assets/[name].[ext]'
          }
        }
      }
    ]
  },
  devtool: false,
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
    new UglifyJSPlugin({
      sourceMap: false,
      uglifyOptions: {
        mangle: {
          keep_classnames: true,
          keep_fnames: true,
          reserved: require('./uglifyWhitelist.json')
        }
      }
    })
  ]
};
