//https://github.com/garousianstudio/starter-webpack-react-es6-sass/blob/master/webpack.prod.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/components/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'ui',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              context: path.resolve(__dirname, 'src'),
              // generate declaration files and source maps in the "dist" folder
              // instead of the "src" folder
              onlyCompileBundledFiles: true,
              transpileOnly: false,
              compilerOptions: {
                declarationDir: path.resolve(__dirname, 'dist'),
                sourceMap: true,
              },
            },
          },],
      },
      {
        test: /\.module\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },

    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    //generate empty/default css file.
    new CopyWebpackPlugin({
      patterns: [
        { from:  path.resolve(__dirname, 'src/components/scss/index.scss'), to: 'index.css' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};
