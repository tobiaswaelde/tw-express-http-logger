import { Request, Response, NextFunction } from 'express';
import { LoggerOptions } from 'tw-logger';
/**
 * Log all HTTP requests
 */
export default function httpLogger(options?: Partial<LoggerOptions>): (req: Request, res: Response, next: NextFunction) => void;
