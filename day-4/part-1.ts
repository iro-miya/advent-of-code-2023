import { readFile } from "node:fs/promises";
import { join } from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await readFile(join(__dirname, "/input.txt"), "utf-8");

const CARD_REGEX = /^Card +(\d+): ([\d ]+) \| ([\d ]+)$/;

console.time("Runtime");

interface Card {
	id: number;
	numbers: number[];
	winning: number[];
}

// Parses every cards
const cards: Card[] = input
	.trim()
	.split(/\n(?:\r)?/g)
	.map((line) => {
		const [, idStr, winningStr, numbersStr] = CARD_REGEX.exec(line)!;

		const id = Number.parseInt(idStr, 10);
		const winning = winningStr
			.split(/ +/g)
			.map((str) => Number.parseInt(str, 10));
		const numbers = numbersStr
			.split(/ +/g)
			.map((str) => Number.parseInt(str, 10));

		return { id, winning, numbers };
	});

// Computes the score (number of wins) on every card
const scores = cards.map((card) => {
	let wins = 0;
	const winningSet = new Set(card.winning);

	for (const number of card.numbers) {
		if (winningSet.has(number)) {
			wins++;
		}
	}

	if (wins > 0) {
		return 2 ** (wins - 1);
	}

	return 0;
});

const sum = scores.reduce((prev, num) => prev + num);

console.timeEnd("Runtime");
console.log("The response is: " + sum);
