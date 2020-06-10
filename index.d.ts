import { Request, Response, NextFunction } from 'express';
/**
 * Log all HTTP requests
 */
export default function httpLogger(req: Request, res: Response, next: NextFunction): void;
