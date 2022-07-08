import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.resolve();

const PATHS = {
  src: path.join(__dirname, './src'),
  public: path.join(__dirname, './public'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets',
};

const config = {
  entry: ['@babel/polyfill', `${PATHS.src}/index.tsx`],

  devtool: 'source-map',

  output: {
    filename: 'index.js',
    path: PATHS.dist,
    clean: true,
  },

  target: 'electron-main',

  externals: {
    path: PATHS,
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      shared: path.resolve(__dirname, './src/shared'),
      pages: path.resolve(__dirname, './src/pages'),
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

export default config;
