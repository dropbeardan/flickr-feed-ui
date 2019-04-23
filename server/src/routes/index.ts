import * as express from 'express';

import { routeErrorHandler } from '../middlewares';

import { getFlickrFeeds } from './getFlickrFeeds';

const routes = express.Router();

routes.get('/', routeErrorHandler(getFlickrFeeds));
routes.get('/:tags', routeErrorHandler(getFlickrFeeds));

export { routes };
