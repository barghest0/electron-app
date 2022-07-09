const { merge } = require('webpack-merge');

const devConfig = require('./webpack.dev.js');

const reactConfig = merge(devConfig, {
  entry: `${devConfig.externals.path.src}/index.tsx`,
  target: 'electron-renderer',
});

module.exports = reactConfig;
