import { readFile } from "node:fs/promises";
import { join } from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await readFile(join(__dirname, "/input.txt"), "utf-8");

console.time("Runtime");

// Split each line
const lines = input.trim().split(/\n(?:\r)?/g);

// Regex of valid digits
const VALID_DIGIT = () => /\d|one|two|three|four|five|six|seven|eight|nine/g;

/**
 * Converts a string containing a number witter in digits (0-9) or letters (except zero)
 * @param input
 * @returns The number or NaN
 */
function processNumber(input: string): number {
	switch (input) {
		case "one":
			return 1;
		case "two":
			return 2;
		case "three":
			return 3;
		case "four":
			return 4;
		case "five":
			return 5;
		case "six":
			return 6;
		case "seven":
			return 7;
		case "eight":
			return 8;
		case "nine":
			return 9;
		default:
			return Number.parseInt(input, 10);
	}
}

// Mats over the line and makes an array of arrayr containint two numbers: the first and the last
const digits: number[] = lines.map((line) => {
	let firstNumber: number;
	let lastNumber: number;

	const digitRegex = VALID_DIGIT();
	let currentNumber: RegExpExecArray | null;

	while ((currentNumber = digitRegex.exec(line))) {
		if (!firstNumber!) {
			// First number only gets assighed once so by the end it's the first matc,
			firstNumber = processNumber(currentNumber[0]);
		}

		// Last number gets assighed every time so by the end it's the last match
		lastNumber = processNumber(currentNumber[0]);

		// Set the last index back to handle cases where some letters contribute to the next match
		// For instance eightwo should match 8 - 2
		digitRegex.lastIndex -= currentNumber[0].length - 1;
	}

	return firstNumber! * 10 + lastNumber!;
});

// Add all the numbers up
const result: number = digits.reduce((result, number) => result + number);

console.timeEnd("Runtime");
console.log("The response is: " + result);
