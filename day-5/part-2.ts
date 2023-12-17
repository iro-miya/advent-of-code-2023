import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { Range, rangeDifference, rangeIntersection } from "./utils.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await readFile(join(__dirname, "/input.txt"), "utf-8");

console.time("Runtime");

interface MapData {
	range: Range;
	add: number; // How much you need to add to convert the source range to the destination range
}

const INPUT_REGEX = /(?<title>[a-z\- ]+[a-z]):\s*(?<content>[\d\s]+\d)/gi;

// Parse seeds ranges
const { content: seedsStr } = INPUT_REGEX.exec(input)!.groups!;
const numbers = seedsStr.split(" ").map((str) => Number.parseInt(str, 10));

let ranges = new Set<Range>();

for (let i = 0; i < numbers.length; i += 2) {
	const start = numbers[i];
	const length = numbers[i + 1];

	ranges.add({
		from: start,
		to: start + length,
	});
}

// Apply each map successively
// (this solution assumes that the maps are in the right order in the input
// and that we want to convert until the last one)

function parseMaps(mapStr: string): MapData[] {
	return mapStr.split(/\n(?:\r)?/g).map((line) => {
		const [destinationRange, sourceRange, length] = line
			.split(" ")
			.map((str) => Number.parseInt(str, 10));

		return {
			range: {
				from: sourceRange,
				to: sourceRange + length - 1,
			},
			add: destinationRange - sourceRange,
		};
	});
}

let match: RegExpMatchArray | null;

while ((match = INPUT_REGEX.exec(input)) != null) {
	const maps = parseMaps(match.groups!.content);

	const mappedRanges = new Set<Range>();

	for (const map of maps) {
		for (const range of ranges) {
			// Check if any number in this range are in the map's range
			const intersect = rangeIntersection(range, map.range);

			if (intersect) {
				// If so, they get mapped
				const mapped = {
					from: intersect.from + map.add,
					to: intersect.to + map.add,
				};

				mappedRanges.add(mapped);

				// Remove the numbers we mapped from the original set of numbers
				ranges.delete(range);

				for (const difference of rangeDifference(range, intersect)) {
					ranges.add(difference);
				}
			}
		}
	}

	for (const range of mappedRanges) {
		ranges.add(range);
	}
}

// Finds the smallest number in the ranges, by getting each range's from value
const answer = Math.min(...[...ranges].map((range) => range.from));

console.timeEnd("Runtime");
console.log("The answer is: " + answer);
