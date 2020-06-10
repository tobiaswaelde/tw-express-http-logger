"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tw_logger_1 = __importStar(require("tw-logger"));
const util_1 = require("./util/util");
const env = String(process.env.NODE_ENV).trim();
/**
 * Log all HTTP requests
 */
function httpLogger(req, res, next) {
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
        const statusColor = util_1.colorFromStatusCode(status);
        const bytesSent = req.get('content-length') || 0;
        const bytesReceived = res.get('content-length') || 0;
        if (env === 'dev') {
            // dev environment: apply colors
            tw_logger_1.default.http(`${tw_logger_1.ConsoleColors.Magenta}${method}${tw_logger_1.ConsoleColors.Reset}` +
                `${tw_logger_1.ConsoleColors.White}${route}${tw_logger_1.ConsoleColors.Reset}` +
                `${statusColor}${status}${tw_logger_1.ConsoleColors.Reset}` +
                `${tw_logger_1.ConsoleColors.Blue}${duration}${tw_logger_1.ConsoleColors.Reset}` +
                ` - ${tw_logger_1.ConsoleColors.Reset}${bytesSent}${tw_logger_1.ConsoleColors.Red}↑` +
                ` ${tw_logger_1.ConsoleColors.Reset}${bytesReceived}${tw_logger_1.ConsoleColors.Green}↓`);
        }
        else {
            tw_logger_1.default.http(`${method} ${route} ${status} ${duration} ms - ${bytesSent}/${bytesReceived}`);
        }
    });
    return next();
}
exports.default = httpLogger;
