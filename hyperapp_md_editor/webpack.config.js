const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/app.jsx',
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js')
  }
};