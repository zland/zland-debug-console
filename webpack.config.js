/*!
 * Copyright 2015 Florian Biewald
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
var webpack = require('webpack'),
    path = require('path');

module.exports = {

  output: {
    filename: 'main.js',
    path: __dirname + '/www/build',
    publicPath: 'build/'
  },

  context: __dirname + "/www",

  cache: true,
  watch: true,
  watchOptions: {
    aggregateTimeout: 500
  },
  watchDelay: 500,
  debug: true,
  devtool: 'cheap-source-map',
  entry: './test.coffee',

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    moduleDirectories: ['node_modules', '.'],
    extensions: ['', '.js', '.coffee', '.scss', '.css', '.json'],
    alias: {
      'backbone': __dirname + '/node_modules/backbone/backbone.js',
      'underscore': __dirname + '/node_modules/underscore/underscore.js',
      'jquery': __dirname + '/node_modules/jquery/dist/jquery.js',
      bluebird: __dirname + '/node_modules/bluebird/js/browser/bluebird.min',
      'bootstrap': __dirname + '/node_modules/bootstrap',
      'fontawesome': __dirname + '/node_modules/font-awesome',
      'handlebars': __dirname + '/node_modules/handlebars/dist/handlebars',
      'moment': __dirname + '/node_modules/moment/min/moment.min',
      'jquery-translate3d': __dirname + '/node_modules/jquery-translate3d/jquery-translate3d.js',
      'whenjs': __dirname + '/node_modules/when',

      // zland modules
      'core': __dirname + '/node_modules/zland-core',
      'map': __dirname + '/node_modules/zland-map',
      'helpOverlay': __dirname,

      'configuration': __dirname + '/config/config'
    }
  },
  module: {
    preLoaders: [],
    loaders: [{
        test: /\.coffee$/,
        loader: "coffee-loader"
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|woff|woff2|eot|ttf|svg).*$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.(json).*$/,
      loader: 'json-loader'
    },

    {
      test: /\.scss$/,
      loader: "style!css!sass?" +
          "includePaths[]=" +
            (path.resolve(__dirname, "./node_modules")) + "&" +
          "includePaths[]=" +
            __dirname
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
        "bootstrap": "bootstrap",
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "Backbone": "backbone",
        "window.Backbone": "backbone",
        "_": "underscore"
    })
  ]

};
