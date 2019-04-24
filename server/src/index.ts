import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';

import { JSONBodySyntaxErrorHandler } from './middlewares';

import { routes } from './routes';

export const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(JSONBodySyntaxErrorHandler);

app.all('*', routes);

if (process.env.MODE !== 'AWS_LAMBDA') {
	const httpPort = process.env.HTTP_PORT || 8880;
	const httpsPort = process.env.HTTPS_PORT || 8881;

	http
		.createServer(app)
		.listen(httpPort, () =>
			console.log(`Listening to HTTP requests on port ${httpPort}.`)
		);
	https
		.createServer(app)
		.listen(httpsPort, () =>
			console.log(`Listening to HTTP requests on port ${httpsPort}.`)
		);
}
