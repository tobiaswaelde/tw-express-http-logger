"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tw_logger_1 = __importStar(require("tw-logger"));
const util_1 = require("./util/util");
/**
 * Log all HTTP requests
 */
function httpLogger(options) {
    if (options)
        tw_logger_1.default.config(options);
    return function x(req, res, next) {
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
            const statusColor = (0, util_1.colorFromStatusCode)(status);
            const bytesSent = req.get('content-length') || 0;
            const bytesReceived = res.get('content-length') || 0;
            if (!(options === null || options === void 0 ? void 0 : options.silent)) {
                tw_logger_1.default.http(`${tw_logger_1.ConsoleColors.Magenta}${method}${tw_logger_1.ConsoleColors.Reset}` +
                    ` ${tw_logger_1.ConsoleColors.White}${route}${tw_logger_1.ConsoleColors.Reset}` +
                    ` ${statusColor}${status}${tw_logger_1.ConsoleColors.Reset}` +
                    ` ${tw_logger_1.ConsoleColors.Blue}${duration}${tw_logger_1.ConsoleColors.Reset}` +
                    ` - ${tw_logger_1.ConsoleColors.Reset}${bytesSent}${tw_logger_1.ConsoleColors.Red}↑` +
                    ` ${tw_logger_1.ConsoleColors.Reset}${bytesReceived}${tw_logger_1.ConsoleColors.Green}↓`);
            }
            else {
                tw_logger_1.default.http(`${method} ${route} ${status} ${duration} ms - ${bytesSent}/${bytesReceived}`);
            }
        });
        return next();
    };
}
exports.default = httpLogger;
