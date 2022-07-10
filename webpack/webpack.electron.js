const { merge } = require('webpack-merge');

const config = require('./webpack.config');

const electronConfig = merge(config, {
  entry: `${config.externals.paths.electron}/main.ts`,
  target: 'electron-main',
  output: {
    filename: '[name].js',
    path: config.externals.paths.dist,
  },
});

module.exports = electronConfig;
