const path = require('path');

module.exports = {
	entry: './src/index.ts',
	mode: 'production',
	target: 'node',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
		extensions: ['.ts', '.js'],
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'build'),
	},
};
