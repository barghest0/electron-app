const { merge } = require('webpack-merge');

const baseConfig = require('../webpack.react.js');

const reactConfig = merge(baseConfig, {
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

module.exports = reactConfig;
