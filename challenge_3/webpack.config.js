const path = require('path');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
  },
  entry: path.resolve(__dirname, 'client/index.jsx'),
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
};
