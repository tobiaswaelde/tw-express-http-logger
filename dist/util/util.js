"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorFromStatusCode = void 0;
const tw_logger_1 = require("tw-logger");
/**
 * **Get color from status code**
 *
 * 200-299: Green
 *
 * 300-399: Cyan
 *
 * 400-499: Yellow
 *
 * \>500: Red
 *
 * @param status HTTP status code
 * @returns {ConsoleColors} Color
 */
function colorFromStatusCode(status) {
    let color = tw_logger_1.ConsoleColors.Green;
    if (status >= 300 && status < 400)
        color = tw_logger_1.ConsoleColors.Cyan;
    if (status >= 400 && status < 500)
        color = tw_logger_1.ConsoleColors.Yellow;
    if (status >= 500)
        color = tw_logger_1.ConsoleColors.Red;
    return color;
}
exports.colorFromStatusCode = colorFromStatusCode;
