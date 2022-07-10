const { merge } = require('webpack-merge');

const baseConfig = require('../webpack.react.js');

const reactConfig = merge(baseConfig, {
  mode: 'production',
});

module.exports = reactConfig;
