const { merge } = require('webpack-merge');

const baseConfig = require('../webpack.config.js');

const devConfig = merge(baseConfig, {
  mode: 'development',

  devServer: {
    static: {
      directory: baseConfig.externals.paths.dist,
      watch: true,
    },
    hot: true,
    port: 8080,
    open: false,
    historyApiFallback: true,
  },
});

module.exports = devConfig;
