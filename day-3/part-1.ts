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

// Gets every number and their position
function* getNumbers(): Generator<Match> {
	for (const [lineNum, line] of lines.entries()) {
		for (let charNum = 0; charNum < line.length; charNum++) {
			let matchStr = "";

			while (/\d/.test(line[charNum])) {
				matchStr += line[charNum];
				charNum++;
			}

			if (matchStr.length > 0) {
				yield {
					line: lineNum,
					char: charNum - matchStr.length,
					str: matchStr,
				};
			}
		}
	}
}

// Gets each character surrounding a match
function* getSurroundingCharacters(match: Match) {
	const currentLine = lines[match.line];

	// End variables are inclusive
	const startChar = match.char - 1;
	const endChar = match.char + match.str.length;
	const startLine = match.line - 1;
	const endLine = match.line + 1;

	// Top line
	if (startLine >= 0) {
		// The + 1 is because the end of .slice is exclusive
		yield* lines[startLine].slice(Math.max(0, startChar), endChar + 1);
	}

	// Character on the left
	if (startChar >= 0) {
		yield currentLine[startChar];
	}

	// Character on the right
	if (endChar < currentLine.length) {
		yield currentLine[endChar];
	}

	// Bottom line
	if (endLine < lines.length) {
		yield* lines[endLine].slice(Math.max(0, startChar), endChar + 1);
	}
}

let sum = 0;

for (const match of getNumbers()) {
	const number = Number.parseInt(match.str, 10);

	for (const char of getSurroundingCharacters(match)) {
		if (!/\d|\./.test(char)) {
			sum += number;
			break;
		}
	}
}

console.timeEnd("Runtime");
console.log("The response is: " + sum);
