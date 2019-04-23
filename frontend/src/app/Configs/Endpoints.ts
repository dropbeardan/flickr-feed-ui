export const SERVER_URL = {
	development: {
		http: process.env.HTTP_PORT || 8880,
		https: process.env.HTTP_PORT || 8881
	},
	production: {
		http: process.env.HTTP_PORT || 8880,
		https: process.env.HTTP_PORT || 8881
	}
};
