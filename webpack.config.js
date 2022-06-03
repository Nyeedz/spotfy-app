const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  mode,
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.(jsx?|js?)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
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
      '@images': path.resolve(__dirname + '/public/img'),
      '@redux': path.resolve(__dirname + '/src/redux'),
      '@utils': path.resolve(__dirname + '/src/utils')
    }
  },
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
  devtool: 'source-map'
}
