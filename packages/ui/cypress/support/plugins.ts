const cyCodeCov = require('@bahmutov/cypress-code-coverage/plugin')
const webpackConfig = require('../../../webpack.dev.config');
const { startDevServer } = require('@cypress/webpack-dev-server');

const webpack = require('webpack');
/**
 * The collection of plugins to use with Cypress
 * @param on  `on` is used to hook into various events Cypress emits
 * @param config  `config` is the resolved Cypress config
 */
export default function plugins(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) {
  const options = {
    webpackOptions: webpackConfig,
  };
  // on('dev-server:start', async (options) => {
  //   return startDevServer({ options });
  // });

  return {
    // add plugins here
    // ...cyDataSession(on, config), // example
    ...cyCodeCov(on, config),
  }
}
