import { readFile } from "node:fs/promises";
import { join } from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await readFile(join(__dirname, "/input.txt"), "utf-8");

console.time("Runtime");

// Split each line and character
const lines = input
	.trim()
	.split(/\n(?:\r)?/g)
	.map((line) => [...line]);

interface Match {
	line: number;
	char: number;
	str: string;
}

// Gets every gear's position
function* getGears(): Generator<Match> {
	for (const [lineNum, line] of lines.entries()) {
		for (const [charNum, char] of line.entries()) {
			if (char === "*") {
				yield {
					line: lineNum,
					char: charNum,
					str: char,
				};
			}
		}
	}
}

// Check if there is a number at a given position and matckes the full number
function checkNumber(lineNum: number, charNum: number): Match | null {
	const currentLine = lines[lineNum];
	let matchStr = currentLine[charNum];

	if (!/\d/.test(matchStr)) {
		return null;
	}

	let start = charNum;

	// Add digits backwards
	while (/\d/.test(currentLine[start - 1])) {
		matchStr = currentLine[start - 1] + matchStr;
		start--;
	}

	// Add digits forward
	while (/\d/.test(currentLine[charNum + 1])) {
		matchStr += currentLine[charNum + 1];
		charNum++;
	}

	return {
		char: start,
		line: lineNum,
		str: matchStr,
	};
}

// Get all the numbers in a range on a given line
function* getNumbersInRange({
	lineNum,
	startChar,
	endChar,
}: {
	lineNum: number;
	startChar: number;
	endChar: number;
}) {
	for (let charNum = startChar; charNum <= endChar; charNum++) {
		const match = checkNumber(lineNum, charNum);

		if (match) {
			yield match;
			// Sets the pointer so the number isn't counted twice
			// This sets the pointer one char after the number since it has to be followed by a symbol
			charNum = match.char + match.str.length;
		}
	}
}

// Gets numbers surrounding a match
function* getSurroundingNumbers(match: Match) {
	const currentLine = lines[match.line];

	// End variables are inclusive
	const startChar = match.char - 1;
	const endChar = match.char + match.str.length;
	const startLine = match.line - 1;
	const endLine = match.line + 1;

	// Top line
	if (startLine >= 0) {
		yield* getNumbersInRange({
			lineNum: startLine,
			startChar: Math.max(startChar, 0),
			endChar: Math.min(endChar, lines[startChar].length),
		});
	}

	// Character on the left
	if (startChar >= 0) {
		const numberMatch = checkNumber(match.line, startChar);

		if (numberMatch) {
			yield numberMatch;
		}
	}

	// Character on the right
	if (endChar < currentLine.length) {
		const numberMatch = checkNumber(match.line, endChar);

		if (numberMatch) {
			yield numberMatch;
		}
	}

	// Bottom line
	if (endLine < lines.length) {
		yield* getNumbersInRange({
			lineNum: endLine,
			startChar: Math.max(startChar, 0),
			endChar: Math.min(endChar, lines[startChar].length),
		});
	}
}

let sum = 0;

for (const match of getGears()) {
	const [first, second] = getSurroundingNumbers(match);

	if (first && second) {
		const firstNum = parseInt(first.str, 10);
		const secondNum = parseInt(second.str, 10);

		sum += firstNum * secondNum;
	}
}

console.timeEnd("Runtime");
console.log("The response is: " + sum);
