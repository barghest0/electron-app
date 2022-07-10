const { merge } = require('webpack-merge');

const baseConfig = require('../webpack.electron.js');

const electronConfig = merge(baseConfig, {
  mode: 'production',
});

module.exports = electronConfig;
