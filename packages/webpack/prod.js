//https://github.com/garousianstudio/starter-webpack-react-es6-sass/blob/master/webpack.prod.js

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./common.js')

const path = require('path')

const config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
}

module.exports = merge(common, config)
