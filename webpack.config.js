const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'aqueue.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
  	loaders: [
  		{
  			test: /\.js$/,
  			exclude: /node_modules/,
  			loader: 'babel-loader',
  			query: {
  				presets: ['es2015', 'stage-1']
  			}
  		}
  	]
  }
};