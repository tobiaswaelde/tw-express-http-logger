import { Request, Response, NextFunction } from 'express';
import logger, { ConsoleColors } from 'tw-logger';
import { colorFromStatusCode } from './util/util';

const env = String(process.env.NODE_ENV).trim();

/**
 * Log all HTTP requests
 */
export default function httpLogger(req: Request, res: Response, next: NextFunction) {
	const start = Date.now();

	res.on('finish', () => {
		/** Duration from sendind request to receiving response */
		const duration = Date.now() - start;

		/** Request Method */
		const method = req.method;

		/** Endpoint */
		const route = req.originalUrl;

		/** HTTP status code */
		const status = res.statusCode;

		/** Color for status code */
		const statusColor = colorFromStatusCode(status);

		const bytesSent = req.get('content-length') || 0;
		const bytesReceived = res.get('content-length') || 0;

		if (env === 'dev') {
			// dev environment: apply colors
			logger.http(
				`${ConsoleColors.Magenta}${method}${ConsoleColors.Reset}` +
					` ${ConsoleColors.White}${route}${ConsoleColors.Reset}` +
					` ${statusColor}${status}${ConsoleColors.Reset}` +
					` ${ConsoleColors.Blue}${duration}${ConsoleColors.Reset}` +
					` - ${ConsoleColors.Reset}${bytesSent}${ConsoleColors.Red}↑` +
					` ${ConsoleColors.Reset}${bytesReceived}${ConsoleColors.Green}↓`
			);
		} else {
			logger.http(
				`${method} ${route} ${status} ${duration} ms - ${bytesSent}/${bytesReceived}`
			);
		}
	});

	return next();
}
