const { merge } = require('webpack-merge');

const baseConfig = require('../webpack.config.js');

const electronConfig = merge(baseConfig, {
  mode: 'production',
  entry: `${baseConfig.externals.paths.electron}/main.ts`,
  target: 'electron-main',
});

module.exports = electronConfig;
