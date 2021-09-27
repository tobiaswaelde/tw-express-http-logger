import { Request, Response, NextFunction } from 'express';
import twLogger, { ConsoleColors, LoggerOptions } from 'tw-logger';
import { colorFromStatusCode } from './util/util';

/**
 * Log all HTTP requests
 */
export default function httpLogger(options: LoggerOptions) {
	const logger = twLogger(options);

	return function x(req: Request, res: Response, next: NextFunction) {
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

			if (options.consoleOutput) {
				logger.http(
					`${ConsoleColors.Magenta}${method}${ConsoleColors.Reset}` +
						` ${ConsoleColors.White}${route}${ConsoleColors.Reset}` +
						` ${statusColor}${status}${ConsoleColors.Reset}` +
						` ${ConsoleColors.Blue}${duration}${ConsoleColors.Reset}` +
						` - ${ConsoleColors.Reset}${bytesSent}${ConsoleColors.Red}↑` +
						` ${ConsoleColors.Reset}${bytesReceived}${ConsoleColors.Green}↓`
				);
			} else {
				logger.http(`${method} ${route} ${status} ${duration} ms - ${bytesSent}/${bytesReceived}`);
			}
		});

		return next();
	};
}
