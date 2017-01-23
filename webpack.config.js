const path = require('path')
const Html = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new Html({
      title: 'Hpack Explorer',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
