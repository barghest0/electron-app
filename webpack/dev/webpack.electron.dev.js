const { merge } = require('webpack-merge');

const baseConfig = require('../webpack.config.js');

const electronConfig = merge(baseConfig, {
  mode: 'development',
  entry: `${baseConfig.externals.path.electron}/main.ts`,
  target: 'electron-main',
});

module.exports = electronConfig;