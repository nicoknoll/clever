var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
	entry: [APP_DIR + '/index.js'],
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module : {
		rules : [
			{
				test: /\.js$/,
		        loader: 'babel-loader',
		        query: {
		          presets: ['es2015']
		        }
		    },
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
		]
	},
	node: {
		net: "empty",
		fs: "empty"
	}
};

module.exports = config;