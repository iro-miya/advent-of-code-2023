import { readFile } from "node:fs/promises";
import { join } from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await readFile(join(__dirname, "/input.txt"), "utf-8");

console.time("Runtime");

interface MapData {
	from: number; // Start of the source range
	to: number; // Inclusive end of the source range
	add: number; // How much you need to add to convert the source range to the destination range
}

const INPUT_REGEX = /(?<title>[a-z\- ]+[a-z]):\s*(?<content>[\d\s]+\d)/gi;

// Parse seeds
const { content: seedsStr } = INPUT_REGEX.exec(input)!.groups!;
let numbers = seedsStr.split(" ").map((str) => Number.parseInt(str, 10));

// Apply each map successively
// (this solution assumes that the maps are in the right order in the input
// and that we want to convert until the last one)

function parseMaps(mapStr: string): MapData[] {
	return mapStr.split(/\n(?:\r)?/g).map((line) => {
		const [destinationRange, sourceRange, length] = line
			.split(" ")
			.map((str) => Number.parseInt(str, 10));

		return {
			from: sourceRange,
			to: sourceRange + length - 1,
			add: destinationRange - sourceRange,
		};
	});
}

let match: RegExpMatchArray | null;

while ((match = INPUT_REGEX.exec(input)) != null) {
	const { content: mapStr } = match.groups!;

	const maps = parseMaps(mapStr);

	numbers = numbers.map((num) => {
		// Finds any applicable map (map where the number is in range)
		const map = maps.find((map) => num >= map.from && num <= map.to);

		if (map) {
			num += map.add;
		}

		return num;
	});
}

const answer = Math.min(...numbers);

console.timeEnd("Runtime");
console.log("The answer is: " + answer);
