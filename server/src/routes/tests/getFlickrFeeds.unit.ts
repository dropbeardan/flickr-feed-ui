import axios from 'axios';

import { FLICKR_FEED_URL, flickrFeedResponseParser } from '../getFlickrFeeds';

describe('getFlickFeeds', () => {
	it('Should fetch a labelled JSON response for a tagless Flickr Feed API', async () => {
		const response = await axios({
			method: 'get',
			baseURL: FLICKR_FEED_URL,
			params: {
				format: 'json'
			}
		});

		expect(() => JSON.parse(flickrFeedResponseParser(response))).not.toThrow();
	});

	it('Should fetch a labelled JSON response for a tagged Flickr Feed API', async () => {
		const response = await axios({
			method: 'get',
			baseURL: FLICKR_FEED_URL,
			params: {
				format: 'json'
			}
		});

		expect(() => JSON.parse(flickrFeedResponseParser(response))).not.toThrow();
	});
});
