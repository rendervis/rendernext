const path = require('path');
const webpack = require("webpack");
const dotenv = require('dotenv');

dotenv.config({ path: ".env" });

/** components rule */
const components = {
  test: /\.(js|ts)x?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-strict-mode',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-transform-modules-commonjs', {loose: true}],
        'istanbul',
      ],
    }
  }
};
/** mdx doc rule */
const mdxDoc =   {
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
  include: path.resolve(__dirname, 'assets')
};

/**
 * loader for svg files inside 'src/svg' directory
 * there are two loaders. one for sprite svg using 'svg-sprite-loader'
 * the other one for embeding inline svg using 'react-svg-loader'
 * NOTE: to use inline svg, add 'inline' query at the end of file path e.g. import User from 'svg/user?inline'
 */
const svg = {
  test: /\.svg$/,
  include: path.resolve(__dirname, 'src/svg'),
  oneOf: [
    {
      resourceQuery: /inline/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env',
          ],
        }

      }, 'react-svg-loader'],
    },
    {
      use: [
        {
          loader: 'svg-sprite-loader',
          options: { symbolId: '[name]' },
        },
        {
          loader: 'svgo-loader',
          options: {}
        }
      ]
    },
  ],
}


const config = {
  module: {
    rules: [components, mdxDoc, files, svg]
  },
  resolve: {
    alias: {
      scss: path.resolve(__dirname, './src/components/scss'),
      assets: path.resolve(__dirname, './assets')
    },
    extensions: ['.js', '.jsx','.ts', '.tsx','.mdx','.css', '.scss', '.svg']
  },
  stats: {
    colors: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ]
};

module.exports = config;
