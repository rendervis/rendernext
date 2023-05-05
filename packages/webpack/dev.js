const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./common.js')
const path = require('path')

/**
 *  plugins
 */
const plugins = (() => {
  const result = [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ]
  return result
})()

const config = {
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    port: 3030,
    historyApiFallback: true,
    open: true,
  },
  plugins: plugins,
}

module.exports = merge(common, config)
