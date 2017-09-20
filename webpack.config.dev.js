import path from 'path';
import webpack from 'webpack';

export default {
  //creates source map viewable in sources tab in browser
  devtool: 'source-map',
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
    //hot reloading
    new webpack.HotModuleReplacementPlugin(),
    //clean error messages
    new webpack.NoEmitOnErrorsPlugin()
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
        test: /\.css$/,
        include: path.join(__dirname, 'client'),
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  //resolve empty extensions to .js extension when importing
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
