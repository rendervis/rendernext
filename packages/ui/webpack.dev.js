const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

/**
 * custom css loader to work with sass module (css module with sass enabled)
 */
const CSSModuleLoader = {
	loader: 'css-loader',
	options: {
		modules: true,
		sourceMap: true,
    modules:{
      localIdentName: '[name]__[local]__[hash:base64:5]'
    }
	}
};
/** css module (with sass) rule */
const sassModules = {
	test: /\.module\.s?css$/,
	include: path.resolve(__dirname, 'src/components'),
	use: [
		'style-loader',
		CSSModuleLoader,
		'resolve-url-loader',
    {
			loader: 'sass-loader',
			options: {
				sourceMap: true,
			},
		},
	]
};
/** pure sass loader  */
const sass = {
	test: /\.scss$/,
  exclude: /\.module\.s?css$/,
	// include: path.resolve(__dirname, 'src/components/scss'),
	use: [
		'style-loader', // creates style nodes from JS strings
		{ // translates CSS into CommonJS
			loader: 'css-loader',
			options: {
				importLoaders: 2,
				sourceMap: true,
			},
		},
		'resolve-url-loader',
    {
			loader: 'sass-loader',
			options: {
				sourceMap: true,
			},
		},
	]
};

/**
 * pure css rule
 * css files can be imported directly in components
 */
const css = {
	test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};



/**
 *  plugins
 */
const plugins = (() => {
  const result = [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ];
  return result;
})();


const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [sassModules, sass, css]
  },
  devServer: {
    port:3030,
    historyApiFallback: true,
    open: true,
    hot: true
  },
  plugins: plugins
};

module.exports = merge(common, config);
