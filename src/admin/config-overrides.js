const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const { injectBabelPlugin } = require('react-app-rewired');

const rootImport = [
  'root-import',
  {
    rootPathPrefix: '~',
    rootPathSuffix: 'src',
  },
];

module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env);
  config = injectBabelPlugin(rootImport, config);
  config = injectBabelPlugin('transform-decorators-legacy', config);
  return config;
};
