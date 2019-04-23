import { Request, RequestHandler, Response, NextFunction } from 'express';

/**
 * Error boundary for unexpected errors that pass through the routes.
 *
 * @example Use as a composition wrapper around the route: route.method('/', routeErrorHandler(routeFn)).
 *
 * @param routeFn Route logic function.
 */
export const routeErrorHandler = (routeFn: RequestHandler) => async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await routeFn(req, res, next);
	} catch (err) {
		console.log(`[${new Date()}] ERR 500:`, err);

		return res.status(500).json({ message: 'Internal Server Error.' });
	}
};

/**
 * Error handler for body-parser middleware.
 *
 * @note body-parser middleware will throw SyntaxError on invalid JSON formats.
 *
 * @param err Refer to ExpressJS
 * @param req Refer to ExpressJS
 * @param res Refer to ExpressJS
 * @param next Refer to ExpressJS
 */
export const JSONBodySyntaxErrorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof SyntaxError) {
		return res.status(400).json({
			message: 'Invalid JSON body'
		});
	}

	return next();
};
