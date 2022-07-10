const { merge } = require('webpack-merge');

const baseConfig = require('../webpack.electron');

const electronConfig = merge(baseConfig, {
  mode: 'development',
});

module.exports = electronConfig;
