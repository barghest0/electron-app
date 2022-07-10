const { merge } = require('webpack-merge');

const config = require('./webpack.config.js');

const reactConfig = merge(config, {
  entry: `${config.externals.paths.src}/index.tsx`,
  target: 'electron-renderer',
  output: {
    filename: 'renderer/[name].js',
    path: config.externals.paths.dist,
  },
});

module.exports = reactConfig;
