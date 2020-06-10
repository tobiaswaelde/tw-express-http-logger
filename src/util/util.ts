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
export function colorFromStatusCode(status: number): ConsoleColors {
	let color = ConsoleColors.Green;
	if (status >= 300 && status < 400) color = ConsoleColors.Cyan;
	if (status >= 400 && status < 500) color = ConsoleColors.Yellow;
	if (status >= 500) color = ConsoleColors.Red;

	return color;
}
