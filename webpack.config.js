var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: 'build.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      // Copy directory contents to {output}/to/directory/
      {
        from: path.join(__dirname, './src', './assets', './images'),
        to: path.join(__dirname, './dist','./assets', './images')
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(svg|eot|ttf|woff2?)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/webfonts/[name].[ext]',
          publicPath: "./dist/"
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
        // loader: 'file-loader',
        // options: {
        //   name: 'assets/css/[name].[ext]'
        // }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules(?![\\/]vue-awesome[\\/])/
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  node: {
    fs: "empty"
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
