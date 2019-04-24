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
		http: `https://l918iu7upb.execute-api.ap-southeast-2.amazonaws.com/production/Flickr_Feed_Proxy/`,
		https: `https://l918iu7upb.execute-api.ap-southeast-2.amazonaws.com/production/Flickr_Feed_Proxy/`
	}
};
