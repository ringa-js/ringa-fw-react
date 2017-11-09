const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const buildInfo = require('./util/buildInfo');
const ROOT_PATH = path.resolve(process.env.PWD);

const UGLIFY_WHITELIST = require('./uglifyWhitelist.json');

const config = {
  name: 'ringa-fw-react',
  devtool: 'source-map',
  entry: {
    app: path.resolve(ROOT_PATH, 'harness/index.js')
  },
  output: {
    path: path.join(ROOT_PATH, 'harness/dist'),
    filename: '[name].[hash].js',
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
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false
    }),
    new HtmlWebpackPlugin({
      title: 'Ringa JS React Framework',
      template: path.resolve(ROOT_PATH, 'harness/templates/index.ejs'),
      filename: 'index.html',
      inject: false,
      cache: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true
      },
      output: {
        comments: false
      },
      mangle: {
        except: UGLIFY_WHITELIST
      }
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