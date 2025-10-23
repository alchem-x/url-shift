import { resolve } from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'
const config = {
  mode: 'development',
  entry: {
    background: resolve(import.meta.dirname, 'src/background/background.js'),
    options: resolve(import.meta.dirname, 'src/options/main.js'),
  },
  module: {
    rules: [
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        resourceQuery: /^((?!raw).)*$/,
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        resourceQuery: /^((?!raw).)*$/,
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        resourceQuery: /^((?!raw).)*$/,
        test: /\.[jt]sx?$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]],
              plugins: ['@vue/babel-plugin-jsx', '@emotion'],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(import.meta.dirname, 'src/options/options.html'),
      chunks: ['options'],
      filename: 'options.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  output: {
    filename: '[name].js',
  },
  performance: {
    maxEntrypointSize: 1024 * 1024,
    maxAssetSize: 1024 * 1024,
  },
}

export default function defineConfig(env) {
  return config
}
