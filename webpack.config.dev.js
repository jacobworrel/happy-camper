const path = require('path');
const webpack = require('webpack');
// @TODO: ExtractTextPlugin

module.exports = {
  // creates source map viewable in sources tab in browser
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'client/index.js')
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    // hot reloading
    new webpack.HotModuleReplacementPlugin(),
    // clean error messages
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.jsx$/,
        include: path.join(__dirname, 'client'),
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.global.css$/,
        include: path.join(__dirname, 'client'),
        use: [
          { loader: 'react-hot-loader' },
          { loader: 'style-loader' },
          { loader: 'css-loader?sourceMap' },
        ]
      },
      {
        test: /\.module.css$/,
        include: path.join(__dirname, 'client'),
        use: [
          { loader: 'react-hot-loader' },
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  // resolve empty extensions to .js extension when importing
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
