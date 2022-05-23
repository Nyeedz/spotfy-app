const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  resolve: {
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.scss'],
    preferRelative: true,
    alias: {
      '@pages': path.resolve(__dirname + '/src/Pages'),
      '@components': path.resolve(__dirname + '/src/Components'),
      '@environment': path.resolve(__dirname + '/environment'),
      '@images': path.resolve(__dirname + '/public/img'),
      '@redux': path.resolve(__dirname + '/src/redux'),
      '@utils': path.resolve(__dirname + '/src/utils')
    }
  },
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader')
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
