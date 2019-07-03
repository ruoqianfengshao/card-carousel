/**
 * @file Webpack basic configuration file.
 */

const path = require('path')

// const commons = ['react', 'react-dom', 'react-router', 'react-router-dom']
const otherConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.js', '.less'],
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['last 4 versions', 'Firefox ESR', '> 0.25%', 'ie >= 9'],
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
      {
        test: /.tsx$/,
        loader: 'ts-loader',
      },
      {
        test: /.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ],
      },
    ],
  },
}
module.exports = [{
  entry: {
    main: './eg1.tsx',
  },
  ...otherConfig,
}]
