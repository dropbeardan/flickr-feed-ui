import axios, { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';

export const FLICKR_FEED_URL =
	'https://api.flickr.com/services/feeds/photos_public.gne';

/**
 * Expected response format:
 * jsonFlickrFeed({
 *  ...JSONData
 * })
 */
export const flickrFeedResponseParser = (response: AxiosResponse<any>) =>
	/^jsonFlickrFeed[(](.*)[)]$/gms.exec(response.data)[1];

export const getFlickrFeeds = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { tags } = req.query;

	if (tags && !Array.isArray(tags)) {
		return res.status(400).json({
			message: 'Bad Parameter: "tags" is not a valid string array.'
		});
	}

	try {
		const response = await axios({
			method: 'get',
			baseURL: FLICKR_FEED_URL,
			params: {
				format: 'json',
				tags: (tags || []).join(',')
			}
		});

		return res.status(response.status).json(flickrFeedResponseParser(response));
	} catch (err) {
		console.log(`[${new Date()}] ERR 500:`, err);

		return res.status(500).json({
			message: 'Unexpected error while fetching data from Flickr API.'
		});
	}
};
