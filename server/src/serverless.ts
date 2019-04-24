import * as AWSServerlessExpress from 'aws-serverless-express';

import { app } from './index';

const server = AWSServerlessExpress.createServer(app);

export const handler = (event: any, context: any) =>
	AWSServerlessExpress.proxy(server, event, context);
