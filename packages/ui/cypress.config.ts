const webpackConfig = require('./webpack.dev.js');

module.exports = {
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig
    },
  },
};
