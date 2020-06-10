import { ConsoleColors } from 'tw-logger';
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
export declare function colorFromStatusCode(status: number): ConsoleColors;
