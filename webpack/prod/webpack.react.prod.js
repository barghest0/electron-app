const { merge } = require('webpack-merge');

const baseConfig = require('../webpack.config.js');

const reactConfig = merge(baseConfig, {
  mode: 'production',
  entry: `${baseConfig.externals.paths.src}/index.tsx`,
  target: 'electron-renderer',
});

module.exports = reactConfig;
