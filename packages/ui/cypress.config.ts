const webpackConfig = require('./webpack.dev.config.js');

module.exports = {
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig
    },
  },
};
