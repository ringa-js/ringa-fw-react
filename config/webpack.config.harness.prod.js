const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const buildInfo = require('./util/buildInfo');
const ROOT_PATH = path.resolve(process.env.PWD);

const config = {
  name: 'ringa-fw-react',
  devtool: false,
  entry: {
    app: ['babel-polyfill', path.resolve(ROOT_PATH, 'harness/index.js')],
    vendor: ['react', 'react-dom', 'showdown', 'trie-search', 'hasharray', 'moment']
  },
  output: {
    path: path.join(ROOT_PATH, 'harness/dist'),
    filename: 'ringa-fw-react.[name].[hash].js',
    publicPath: '/'
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
  module: {
    loaders: [
      {
        test: /\.(md|txt)$/,
        loader: 'raw-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?![ringa|react\-ringa|ringa\-fw\-core])/,
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
            name: 'assets/[hash].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|sv/),
    new HtmlWebpackPlugin({
      title: 'Ringa JS React Framework',
      template: path.resolve(ROOT_PATH, 'harness/templates/index.ejs'),
      filename: 'index.html',
      inject: false,
      cache: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      filename: 'ringa-fw-react.[name].[hash].js',
      minChunks: Infinity
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
    }),
    new ExtractTextPlugin({
      filename: 'ringa-fw-react.[contenthash].css',
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    })
  ]
};

module.exports = new Promise(resolve => {
  buildInfo(build => {
    config.plugins.unshift(new webpack.DefinePlugin({
      __DEV__: true,
      __BUILD__: JSON.stringify(build),
      __BUILD_EPOCH__: new Date().getTime(),
      'process.env': {
        NODE_ENV: '"production"'
      }
    }));

    resolve(config);
  })
});