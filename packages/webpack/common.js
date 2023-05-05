const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: '.env' })

/** mdx doc rule */
const mdxDoc = {
  test: /\.mdx?$/,
  use: ['babel-loader', '@mdx-js/loader'],
}

/**
 * all files rule including fonts
 * 'include' key is needed to not interfere sprite svg rule
 */
const files = {
  test: /\.(jpg|jpeg|png|gif|svg|pdf|woff|woff2|eot|ttf)$/,
  loader: 'file-loader',
  include: path.resolve(__dirname, 'assets'),
}

/**
 * loader for svg files inside 'src/svg' directory
 * there are two loaders. one for sprite svg using 'svg-sprite-loader'
 * the other one for embedding inline svg using 'react-svg-loader'
 * NOTE: to use inline svg, add 'inline' query at the end of file path e.g. import User from 'svg/user?inline'
 */
const svg = {
  test: /\.svg$/,
  include: path.resolve(__dirname, 'assets'),
  oneOf: [
    {
      resourceQuery: /inline/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
        'react-svg-loader',
      ],
    },
    {
      use: [
        {
          loader: 'svg-sprite-loader',
          options: { symbolId: '[name]' },
        },
        {
          loader: 'svgo-loader',
          options: {},
        },
      ],
    },
  ],
}

/**
 * custom css loader to work with sass module (css module with sass enabled)
 */
const CSSModuleLoader = {
  test: /\.module\.s?css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { modules: true },
    },
  ],
}
/** css module (with sass) rule */
const sassModules = {
  test: /\.module\.s?css$/,
  include: path.resolve(__dirname, 'src/*'),
  use: [
    'style-loader',
    'resolve-url-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
}
/** pure sass loader  */
const sass = {
  test: /\.scss$/,
  exclude: /\.module\.s?css$/,
  include: path.resolve(__dirname, 'src/*'),
  use: [
    'style-loader', // creates style nodes from JS strings
    {
      // translates CSS into CommonJS
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
  ],
}

/**
 * pure css rule
 * css files can be imported directly in components
 */
const css = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
}

const config = {
  module: {
    rules: [CSSModuleLoader, sassModules, sass, css, mdxDoc, files, svg],
  },
  resolve: {
    alias: {
      scss: path.resolve(__dirname, './src/components/scss'),
      assets: path.resolve(__dirname, './assets'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx', '.css', '.scss', '.svg','.glb','.gltf','jpg','png'],
  },
  stats: {
    colors: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
}

module.exports = config
