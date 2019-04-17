var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src/app/index.tsx'),
	output: {
		filename: 'index.bundle.js',
		path: path.join(__dirname, 'dist')
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	// webpack-dev-server configuration.
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: process.env.PORT || 25000
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json']
	},

	// Runtime environment.
	mode: process.env.NODE_ENV || 'production',

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/public/index.html')
		})
	]
};
