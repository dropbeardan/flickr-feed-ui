interface ISERVER_URL {
	[K: string]: {
		http: string;
		https: string;
	};
}

export const SERVER_URL: ISERVER_URL = {
	development: {
		http: `http://localhost:${process.env.HTTP_PORT || 8880}`,
		https: `http://localhost:${process.env.HTTPS_PORT || 8881}`
	},
	production: {
		http: `http://localhost:${process.env.HTTP_PORT || 8880}`,
		https: `http://localhost:${process.env.HTTPS_PORT || 8881}`
	}
};
