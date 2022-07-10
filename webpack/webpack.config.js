const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  public: path.resolve(__dirname, '../public'),
  dist: path.resolve(__dirname, '../dist'),
  electron: path.resolve(__dirname, '../electron'),
  assets: 'assets',
};

const config = {
  devtool: 'source-map',

  output: {
    filename: '[name].js',
    path: PATHS.dist,
    clean: true,
  },

  externals: {
    paths: PATHS,
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      shared: path.resolve(__dirname, '../src/shared'),
      pages: path.resolve(__dirname, '../src/pages'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]-[hash:base64:5]',
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}/images/[name][ext]`,
        },
      },

      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}/fonts/[name][ext]`,
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${PATHS.public}/index.html`,
      filename: `index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
    }),
  ],
};

module.exports = config;
