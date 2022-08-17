const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin =  require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
  	index: path.resolve(__dirname, './src/js/index.js'),
  	detail: path.resolve(__dirname, './src/js/detail.js'),
  	cart: path.resolve(__dirname, './src/js/cart.js')
  },
  output: {
  	path: path.resolve(__dirname + '/dist'),
  	filename: 'js/[name]-[hash].js',
    //publicPath:"./"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        query:{
          "presets": ["latest"]
        }
      },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader'
      },
      {
        test:/\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          }
        ]
      },
      {
        test:/\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        loaders: [
          'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new uglify(),
    new htmlWebpackPlugin({
    	minify: {
    		removeComments: true,
    		collapseWhitespace: true
    	},
    	filename: 'index.html',
    	template: path.resolve(__dirname, 'src/index.html'),
    	title: '商品列表',
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
    	chunks: ['index'],
      hash: true
    }),
    new htmlWebpackPlugin({
    	minify: {
    		removeComments: true,
    		collapseWhitespace: true
    	},
    	filename: 'detail.html',
    	template: path.resolve(__dirname, 'src/detail.html'),
    	title: '商品详情页',
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
    	chunks: ['detail'],
      hash: true
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'cart.html',
      template: path.resolve(__dirname, 'src/cart.html'),
      title: '商品购物车',
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      chunks: ['cart'],
      hash: true
    }),
    new cleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist/js', 'dist/*.html']
    })
  ], 
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    host: 'localhost',
    port: 3300
  }
}

module.exports = config;

//npm install webpack-dev-server --save-dev







