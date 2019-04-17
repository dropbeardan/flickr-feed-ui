const webpackConfig = require('../webpack.config');

module.exports = async ({ config }) => ({
	...config,
	module: {
		...config.module,
		rules: webpackConfig.module.rules
	},
	resolve: {
		...config.resolve,
		extensions: webpackConfig.resolve.extensions
	}
});
